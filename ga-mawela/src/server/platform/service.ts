import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type {
  LibraryDocument,
  MinePoint,
  OpportunityCard,
  ResearchSource,
  SlpCommitment,
} from "@/data/platformData";
import {
  baseDocuments,
  minePoints,
  opportunities,
  researchSources,
  slpCommitments,
  updates,
} from "@/data/platformData";
import { getPlatformSqlRuntimeStatus, runPlatformSqlCommand, runPlatformSqlJsonQuery } from "@/server/platform/sqlcmd";

export type PlatformRole = "admin" | "member";

export type PlatformUserRecord = {
  id: string;
  email: string;
  name: string;
  role: PlatformRole;
  membershipNumber?: string | null;
  preferredLanguage?: string | null;
  passwordHash?: string;
};

export type PlatformEngagementRecord = {
  id: string;
  kind: "comment" | "report";
  section: string;
  name: string;
  message: string;
  issueType?: string;
  fileName?: string;
  locale: string;
  submittedAt: string;
  fileUrl?: string;
};

export type PlatformSystemSnapshot = {
  sql: ReturnType<typeof getPlatformSqlRuntimeStatus>;
  users: number;
  documents: number;
  sources: number;
  updates: number;
};

export type PlatformOverview = {
  mines: MinePoint[];
  commitments: SlpCommitment[];
  opportunities: OpportunityCard[];
  documents: LibraryDocument[];
  sources: ResearchSource[];
  updates: Array<{ title: string; detail: string }>;
  system: PlatformSystemSnapshot;
};

const LOCAL_USERS_PATH = path.join(process.cwd(), "data", "platform-users.json");
const LOCAL_DOCUMENTS_PATH = path.join(process.cwd(), "data", "platform-documents.json");
const LOCAL_ENGAGEMENT_PATH = path.join(process.cwd(), "data", "platform-engagement.json");

type LocalDocumentRecord = LibraryDocument & {
  fileName?: string;
  fileUrl?: string;
  uploadedAt?: string;
};

function normalizeUser(entry: Record<string, unknown>): PlatformUserRecord {
  return {
    id: String(entry.id ?? entry.Id),
    email: String(entry.email ?? entry.Email),
    name: String(entry.name ?? entry.FullName),
    role: (String(entry.role ?? entry.RoleName ?? "member") === "admin"
      ? "admin"
      : "member") as PlatformRole,
    membershipNumber: entry.membershipNumber
      ? String(entry.membershipNumber)
      : entry.MembershipNumber
        ? String(entry.MembershipNumber)
        : null,
    preferredLanguage: entry.preferredLanguage
      ? String(entry.preferredLanguage)
      : entry.PreferredLanguage
        ? String(entry.PreferredLanguage)
        : null,
    passwordHash: entry.passwordHash
      ? String(entry.passwordHash)
      : entry.PasswordHash
        ? String(entry.PasswordHash)
        : undefined,
  };
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJsonFile<T>(filePath: string, value: T) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(value, null, 2), "utf8");
}

async function listSqlUsers() {
  return runPlatformSqlJsonQuery<PlatformUserRecord[]>(
    `
      SELECT
        CAST(Id AS nvarchar(36)) AS id,
        Email AS email,
        FullName AS name,
        RoleName AS role,
        MembershipNumber AS membershipNumber,
        PreferredLanguage AS preferredLanguage,
        PasswordHash AS passwordHash
      FROM dbo.Users
      ORDER BY RoleName DESC, FullName ASC
      FOR JSON PATH
    `,
    undefined,
    [],
  );
}

async function listSqlDocuments() {
  return runPlatformSqlJsonQuery<LibraryDocument[]>(
    `
      SELECT
        Id AS id,
        Title AS title,
        Category AS category,
        Description AS description,
        PublishedDate AS date,
        SourceName AS source,
        COALESCE(FileUrl, ExternalUrl) AS href
      FROM dbo.Documents
      ORDER BY IsFeatured DESC, CreatedAt DESC, Title ASC
      FOR JSON PATH
    `,
    undefined,
    [],
  );
}

async function listSqlSources() {
  return runPlatformSqlJsonQuery<ResearchSource[]>(
    `
      SELECT
        Id AS id,
        Title AS title,
        Publisher AS publisher,
        Category AS category,
        SourceDate AS date,
        Href AS href,
        Summary AS summary
      FROM dbo.Sources
      ORDER BY SortOrder ASC, SourceDate DESC
      FOR JSON PATH
    `,
    undefined,
    [],
  );
}

async function listSqlUpdates() {
  return runPlatformSqlJsonQuery<Array<{ title: string; detail: string }>>(
    `
      SELECT
        Title AS title,
        Detail AS detail
      FROM dbo.PlatformUpdates
      ORDER BY SortOrder ASC, CreatedAt DESC
      FOR JSON PATH
    `,
    undefined,
    [],
  );
}

async function listSqlMines() {
  return runPlatformSqlJsonQuery<MinePoint[]>(
    `
      SELECT
        Id AS id,
        Name AS name,
        Company AS company,
        CompanyFilter AS companyFilter,
        Commodity AS commodity,
        MineType AS type,
        Corridor AS corridor,
        Description AS description,
        CommunityImpact AS communityImpact,
        SlpStatus AS slpStatus,
        CAST(MapX AS int) AS x,
        CAST(MapY AS int) AS y
      FROM dbo.Mines
      ORDER BY Name ASC
      FOR JSON PATH
    `,
    undefined,
    [],
  );
}

async function listSqlCommitments() {
  return runPlatformSqlJsonQuery<SlpCommitment[]>(
    `
      SELECT
        Id AS id,
        MineId AS mineId,
        MineName AS mineName,
        Company AS company,
        CommitmentType AS type,
        StatusName AS status,
        ReportYear AS year,
        Notes AS notes,
        Detail AS detail
      FROM dbo.SlpCommitments
      ORDER BY MineName ASC, CreatedAt DESC
      FOR JSON PATH
    `,
    undefined,
    [],
  );
}

async function listSqlOpportunities() {
  return runPlatformSqlJsonQuery<OpportunityCard[]>(
    `
      SELECT
        Id AS id,
        Category AS category,
        Title AS title,
        OwnerName AS owner,
        StatusName AS status,
        Summary AS summary,
        HowToApply AS howToApply,
        Href AS href
      FROM dbo.Opportunities
      ORDER BY SortOrder ASC, Title ASC
      FOR JSON PATH
    `,
    undefined,
    [],
  );
}

async function listLocalUsers() {
  const raw = await readJsonFile<Array<Record<string, unknown>>>(LOCAL_USERS_PATH, []);
  return raw.map((entry) => normalizeUser(entry));
}

async function listLocalDocuments() {
  const stored = await readJsonFile<LocalDocumentRecord[]>(LOCAL_DOCUMENTS_PATH, []);
  return [...baseDocuments, ...stored];
}

export async function listPlatformUsers() {
  const sqlUsers = await listSqlUsers();
  if (sqlUsers.length > 0) {
    return sqlUsers.map((entry) => normalizeUser(entry as Record<string, unknown>));
  }

  return listLocalUsers();
}

export async function findPlatformUserByEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();

  const sqlUser = await runPlatformSqlJsonQuery<PlatformUserRecord | null>(
    `
      SELECT TOP 1
        CAST(Id AS nvarchar(36)) AS id,
        Email AS email,
        FullName AS name,
        RoleName AS role,
        MembershipNumber AS membershipNumber,
        PreferredLanguage AS preferredLanguage,
        PasswordHash AS passwordHash
      FROM dbo.Users
      WHERE LOWER(Email) = LOWER(N'${normalizedEmail.replace(/'/g, "''")}')
      FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
    `,
    undefined,
    null,
  );

  if (sqlUser) {
    return normalizeUser(sqlUser as unknown as Record<string, unknown>);
  }

  const users = await listLocalUsers();
  return users.find((entry) => entry.email.toLowerCase() === normalizedEmail) ?? null;
}

export async function listPlatformDocuments() {
  const sqlDocuments = await listSqlDocuments();
  if (sqlDocuments.length > 0) {
    return sqlDocuments;
  }

  return listLocalDocuments();
}

export async function savePlatformDocument(input: {
  id: string;
  title: string;
  category: string;
  description: string;
  source: string;
  date: string;
  href?: string;
  fileName?: string;
}) {
  try {
    await runPlatformSqlCommand(`
      INSERT INTO dbo.Documents (
        Id,
        Title,
        Category,
        Description,
        SourceName,
        PublishedDate,
        FileUrl,
        ExternalUrl,
        FileName,
        IsFeatured
      )
      VALUES (
        N'${input.id.replace(/'/g, "''")}',
        N'${input.title.replace(/'/g, "''")}',
        N'${input.category.replace(/'/g, "''")}',
        N'${input.description.replace(/'/g, "''")}',
        N'${input.source.replace(/'/g, "''")}',
        N'${input.date.replace(/'/g, "''")}',
        ${input.href ? `N'${input.href.replace(/'/g, "''")}'` : "NULL"},
        ${input.href ? `N'${input.href.replace(/'/g, "''")}'` : "NULL"},
        ${input.fileName ? `N'${input.fileName.replace(/'/g, "''")}'` : "NULL"},
        0
      );
    `);
  } catch {
    const documents = await readJsonFile<LocalDocumentRecord[]>(LOCAL_DOCUMENTS_PATH, []);
    documents.unshift({
      id: input.id,
      title: input.title,
      category: input.category as LibraryDocument["category"],
      description: input.description,
      date: input.date,
      source: input.source,
      href: input.href,
      fileName: input.fileName,
      fileUrl: input.href,
      uploadedAt: new Date().toISOString(),
    });
    await writeJsonFile(LOCAL_DOCUMENTS_PATH, documents);
  }

  return {
    id: input.id,
    title: input.title,
    category: input.category as LibraryDocument["category"],
    description: input.description,
    date: input.date,
    source: input.source,
    href: input.href,
  } satisfies LibraryDocument;
}

export async function listPlatformSources() {
  const sqlSources = await listSqlSources();
  return sqlSources.length > 0 ? sqlSources : researchSources;
}

export async function listPlatformUpdates() {
  const sqlUpdates = await listSqlUpdates();
  return sqlUpdates.length > 0 ? sqlUpdates : updates;
}

export async function listPlatformEngagement(section?: string, kind?: "comment" | "report") {
  const conditions = [
    section ? `SectionName = N'${section.replace(/'/g, "''")}'` : null,
    kind ? `EntryKind = N'${kind.replace(/'/g, "''")}'` : null,
  ].filter(Boolean);

  const sqlEntries = await runPlatformSqlJsonQuery<PlatformEngagementRecord[]>(
    `
      SELECT
        CAST(Id AS nvarchar(36)) AS id,
        EntryKind AS kind,
        SectionName AS section,
        FullName AS name,
        MessageText AS message,
        IssueType AS issueType,
        FileName AS fileName,
        PreferredLanguage AS locale,
        CONVERT(varchar(10), CreatedAt, 23) AS submittedAt,
        FileUrl AS fileUrl
      FROM dbo.EngagementEntries
      ${conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : ""}
      ORDER BY CreatedAt DESC
      FOR JSON PATH
    `,
    undefined,
    [],
  );

  if (sqlEntries.length > 0) {
    return sqlEntries;
  }

  const localEntries = await readJsonFile<PlatformEngagementRecord[]>(LOCAL_ENGAGEMENT_PATH, []);
  return localEntries
    .filter((entry) => (section ? entry.section === section : true))
    .filter((entry) => (kind ? entry.kind === kind : true));
}

export async function savePlatformEngagement(input: {
  id: string;
  kind: "comment" | "report";
  section: string;
  name: string;
  message: string;
  issueType?: string;
  fileName?: string;
  fileUrl?: string;
  locale: string;
  submittedAt: string;
}) {
  try {
    await runPlatformSqlCommand(`
      INSERT INTO dbo.EngagementEntries (
        Id,
        EntryKind,
        SectionName,
        FullName,
        MessageText,
        IssueType,
        FileName,
        FileUrl,
        PreferredLanguage,
        CreatedAt
      )
      VALUES (
        '${input.id.replace(/'/g, "''")}',
        N'${input.kind.replace(/'/g, "''")}',
        N'${input.section.replace(/'/g, "''")}',
        N'${(input.name || "Anonymous").replace(/'/g, "''")}',
        N'${input.message.replace(/'/g, "''")}',
        ${input.issueType ? `N'${input.issueType.replace(/'/g, "''")}'` : "NULL"},
        ${input.fileName ? `N'${input.fileName.replace(/'/g, "''")}'` : "NULL"},
        ${input.fileUrl ? `N'${input.fileUrl.replace(/'/g, "''")}'` : "NULL"},
        N'${input.locale.replace(/'/g, "''")}',
        '${input.submittedAt}T00:00:00'
      );
    `);
  } catch {
    const localEntries = await readJsonFile<PlatformEngagementRecord[]>(
      LOCAL_ENGAGEMENT_PATH,
      [],
    );
    localEntries.unshift(input);
    await writeJsonFile(LOCAL_ENGAGEMENT_PATH, localEntries);
  }

  return input;
}

export async function getPlatformOverview() {
  const [sqlMines, sqlCommitments, sqlOpportunities, documents, sources, currentUpdates, users] =
    await Promise.all([
      listSqlMines(),
      listSqlCommitments(),
      listSqlOpportunities(),
      listPlatformDocuments(),
      listPlatformSources(),
      listPlatformUpdates(),
      listPlatformUsers(),
    ]);

  return {
    mines: sqlMines.length > 0 ? sqlMines : minePoints,
    commitments: sqlCommitments.length > 0 ? sqlCommitments : slpCommitments,
    opportunities: sqlOpportunities.length > 0 ? sqlOpportunities : opportunities,
    documents,
    sources,
    updates: currentUpdates,
    system: {
      sql: getPlatformSqlRuntimeStatus(),
      users: users.length,
      documents: documents.length,
      sources: sources.length,
      updates: currentUpdates.length,
    },
  } satisfies PlatformOverview;
}
