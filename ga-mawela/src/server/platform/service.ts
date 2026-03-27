import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import bcrypt from "bcryptjs";
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

export async function listPlatformOpportunities() {
  const sqlOpps = await listSqlOpportunities();
  return sqlOpps.length > 0 ? sqlOpps : opportunities;
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

// ============ User CRUD Operations ============

export async function createPlatformUser(input: {
  email: string;
  name: string;
  role: PlatformRole;
  password: string;
  membershipNumber?: string;
  preferredLanguage?: string;
}): Promise<PlatformUserRecord> {
  const id = crypto.randomUUID();
  const passwordHash = await bcrypt.hash(input.password, 12);
  const now = new Date().toISOString().slice(0, 10);

  const userRecord: PlatformUserRecord = {
    id,
    email: input.email.toLowerCase().trim(),
    name: input.name.trim(),
    role: input.role,
    membershipNumber: input.membershipNumber || null,
    preferredLanguage: input.preferredLanguage || null,
    passwordHash,
  };

  try {
    await runPlatformSqlCommand(`
      INSERT INTO dbo.Users (Id, Email, FullName, RoleName, MembershipNumber, PreferredLanguage, PasswordHash, CreatedAt)
      VALUES (
        N'${id}',
        N'${userRecord.email}',
        N'${userRecord.name}',
        N'${userRecord.role}',
        ${userRecord.membershipNumber ? `N'${userRecord.membershipNumber}'` : "NULL"},
        ${userRecord.preferredLanguage ? `N'${userRecord.preferredLanguage}'` : "NULL"},
        N'${passwordHash}',
        N'${now}'
      );
    `);
  } catch {
    // Fallback to local storage
    const users = await readJsonFile<PlatformUserRecord[]>(LOCAL_USERS_PATH, []);
    users.push(userRecord);
    await writeJsonFile(LOCAL_USERS_PATH, users);
  }

  // Return without passwordHash
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _pwh, ...safeUser } = userRecord;
  return safeUser as Omit<PlatformUserRecord, 'passwordHash'>;
}

export async function updatePlatformUser(
  id: string,
  updates: Partial<Pick<PlatformUserRecord, "email" | "name" | "role" | "membershipNumber" | "preferredLanguage">>
): Promise<PlatformUserRecord | null> {
  const users = await listPlatformUsers();
  const userIndex = users.findIndex((u) => u.id === id);

  if (userIndex === -1) {
    return null;
  }

  const updatedUser = { ...users[userIndex], ...updates };

  try {
    await runPlatformSqlCommand(`
      UPDATE dbo.Users SET
        Email = N'${updatedUser.email}',
        FullName = N'${updatedUser.name}',
        RoleName = N'${updatedUser.role}',
        MembershipNumber = ${updatedUser.membershipNumber ? `N'${updatedUser.membershipNumber}'` : "NULL"},
        PreferredLanguage = ${updatedUser.preferredLanguage ? `N'${updatedUser.preferredLanguage}'` : "NULL"}
      WHERE Id = N'${id}';
    `);
  } catch {
    // Fallback to local storage
    const localUsers = await readJsonFile<PlatformUserRecord[]>(LOCAL_USERS_PATH, []);
    const localIndex = localUsers.findIndex((u) => u.id === id);
    if (localIndex !== -1) {
      localUsers[localIndex] = updatedUser;
      await writeJsonFile(LOCAL_USERS_PATH, localUsers);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash: _pwh, ...safeUser } = updatedUser;
  return safeUser as Omit<PlatformUserRecord, 'passwordHash'>;
}

export async function deletePlatformUser(id: string): Promise<boolean> {
  const users = await listPlatformUsers();
  const exists = users.some((u) => u.id === id);

  if (!exists) {
    return false;
  }

  try {
    await runPlatformSqlCommand(`DELETE FROM dbo.Users WHERE Id = N'${id}';`);
  } catch {
    // Fallback to local storage
    const localUsers = await readJsonFile<PlatformUserRecord[]>(LOCAL_USERS_PATH, []);
    const filtered = localUsers.filter((u) => u.id !== id);
    await writeJsonFile(LOCAL_USERS_PATH, filtered);
  }

  return true;
}

// ============ Document CRUD Operations ============

export async function updatePlatformDocument(
  id: string,
  updates: Partial<Pick<LibraryDocument, "title" | "category" | "description" | "source" | "date">>
): Promise<LibraryDocument | null> {
  const documents = await listPlatformDocuments();
  const docIndex = documents.findIndex((d) => d.id === id);

  if (docIndex === -1) {
    return null;
  }

  const updatedDoc = { ...documents[docIndex], ...updates };

  try {
    await runPlatformSqlCommand(`
      UPDATE dbo.Documents SET
        Title = N'${updatedDoc.title}',
        Category = N'${updatedDoc.category}',
        Description = N'${updatedDoc.description}',
        SourceName = N'${updatedDoc.source}',
        PublishedDate = N'${updatedDoc.date}'
      WHERE Id = N'${id}';
    `);
  } catch {
    // Fallback to local storage
    const localDocs = await readJsonFile<LocalDocumentRecord[]>(LOCAL_DOCUMENTS_PATH, []);
    const localIndex = localDocs.findIndex((d) => d.id === id);
    if (localIndex !== -1) {
      localDocs[localIndex] = { ...localDocs[localIndex], ...updates };
      await writeJsonFile(LOCAL_DOCUMENTS_PATH, localDocs);
    }
  }

  return updatedDoc;
}

export async function deletePlatformDocument(id: string): Promise<boolean> {
  const documents = await listPlatformDocuments();
  const exists = documents.some((d) => d.id === id);

  if (!exists) {
    return false;
  }

  try {
    await runPlatformSqlCommand(`DELETE FROM dbo.Documents WHERE Id = N'${id}';`);
  } catch {
    // Fallback to local storage
    const localDocs = await readJsonFile<LocalDocumentRecord[]>(LOCAL_DOCUMENTS_PATH, []);
    const filtered = localDocs.filter((d) => d.id !== id);
    await writeJsonFile(LOCAL_DOCUMENTS_PATH, filtered);
  }

  return true;
}

// ============ Engagement Moderation Operations ============

export async function moderatePlatformEngagement(
  id: string,
  action: "approve" | "reject" | "delete"
): Promise<PlatformEngagementRecord | null> {
  const allEntries = await listPlatformEngagement();
  const entry = allEntries.find((e) => e.id === id);

  if (!entry) {
    return null;
  }

  if (action === "delete") {
    try {
      await runPlatformSqlCommand(`DELETE FROM dbo.EngagementEntries WHERE Id = N'${id}';`);
    } catch {
      const localEntries = await readJsonFile<PlatformEngagementRecord[]>(LOCAL_ENGAGEMENT_PATH, []);
      const filtered = localEntries.filter((e) => e.id !== id);
      await writeJsonFile(LOCAL_ENGAGEMENT_PATH, filtered);
    }
    return entry;
  }

  // For approve/reject, we'd typically add a status field
  // For now, we'll just return the entry
  return entry;
}
