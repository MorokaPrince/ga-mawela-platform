import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  baseDocuments,
  minePoints,
  opportunities,
  researchSources,
  slpCommitments,
  updates,
} from "../src/data/platformData";
import { escapeSqlString, runPlatformSqlCommand } from "../src/server/platform/sqlcmd";

type SeedUser = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "member";
  passwordHash: string;
  membershipNumber?: string;
  preferredLanguage?: string;
};

function nvarchar(value?: string | null) {
  if (!value) {
    return "NULL";
  }

  return `N'${escapeSqlString(value)}'`;
}

async function readUsers() {
  const filePath = path.join(process.cwd(), "data", "platform-users.json");
  const raw = await readFile(filePath, "utf8");
  const users = JSON.parse(raw) as SeedUser[];

  return users.map((user, index) => ({
    ...user,
    membershipNumber:
      user.membershipNumber ?? `GM-${String(index + 1).padStart(4, "0")}`,
    preferredLanguage: user.preferredLanguage ?? "en",
  }));
}

async function replaceTable(tableName: string, statements: string[]) {
  await runPlatformSqlCommand(`
    DELETE FROM dbo.${tableName};
    ${statements.join("\n")}
  `);
}

async function seedUsers() {
  const users = await readUsers();

  await replaceTable(
    "Users",
    users.map(
      (user) => `
        INSERT INTO dbo.Users (
          Id,
          Email,
          FullName,
          RoleName,
          StatusName,
          MembershipNumber,
          PreferredLanguage,
          PasswordHash
        ) VALUES (
          ${nvarchar(user.id)},
          ${nvarchar(user.email)},
          ${nvarchar(user.name)},
          ${nvarchar(user.role)},
          N'active',
          ${nvarchar(user.membershipNumber)},
          ${nvarchar(user.preferredLanguage)},
          ${nvarchar(user.passwordHash)}
        );
      `,
    ),
  );
}

async function seedMines() {
  await replaceTable(
    "Mines",
    minePoints.map(
      (item) => `
        INSERT INTO dbo.Mines (
          Id,
          Name,
          Company,
          CompanyFilter,
          Commodity,
          MineType,
          Corridor,
          Description,
          CommunityImpact,
          SlpStatus,
          MapX,
          MapY
        ) VALUES (
          ${nvarchar(item.id)},
          ${nvarchar(item.name)},
          ${nvarchar(item.company)},
          ${nvarchar(item.companyFilter)},
          ${nvarchar(item.commodity)},
          ${nvarchar(item.type)},
          ${nvarchar(item.corridor)},
          ${nvarchar(item.description)},
          ${nvarchar(item.communityImpact)},
          ${nvarchar(item.slpStatus)},
          ${item.x},
          ${item.y}
        );
      `,
    ),
  );
}

async function seedCommitments() {
  await replaceTable(
    "SlpCommitments",
    slpCommitments.map(
      (item) => `
        INSERT INTO dbo.SlpCommitments (
          Id,
          MineId,
          MineName,
          Company,
          CommitmentType,
          StatusName,
          ReportYear,
          Notes,
          Detail
        ) VALUES (
          ${nvarchar(item.id)},
          ${nvarchar(item.mineId)},
          ${nvarchar(item.mineName)},
          ${nvarchar(item.company)},
          ${nvarchar(item.type)},
          ${nvarchar(item.status)},
          ${nvarchar(item.year)},
          ${nvarchar(item.notes)},
          ${nvarchar(item.detail)}
        );
      `,
    ),
  );
}

async function seedOpportunities() {
  await replaceTable(
    "Opportunities",
    opportunities.map(
      (item, index) => `
        INSERT INTO dbo.Opportunities (
          Id,
          Category,
          Title,
          OwnerName,
          StatusName,
          Summary,
          HowToApply,
          Href,
          SortOrder
        ) VALUES (
          ${nvarchar(item.id)},
          ${nvarchar(item.category)},
          ${nvarchar(item.title)},
          ${nvarchar(item.owner)},
          ${nvarchar(item.status)},
          ${nvarchar(item.summary)},
          ${nvarchar(item.howToApply)},
          ${nvarchar(item.href)},
          ${index}
        );
      `,
    ),
  );
}

async function seedDocuments() {
  await replaceTable(
    "Documents",
    baseDocuments.map(
      (item, index) => `
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
          IsFeatured,
          LanguageCode
        ) VALUES (
          ${nvarchar(item.id)},
          ${nvarchar(item.title)},
          ${nvarchar(item.category)},
          ${nvarchar(item.description)},
          ${nvarchar(item.source)},
          ${nvarchar(item.date)},
          ${nvarchar(item.href ?? null)},
          ${nvarchar(item.href ?? null)},
          NULL,
          ${index < 3 ? 1 : 0},
          N'en'
        );
      `,
    ),
  );
}

async function seedSources() {
  await replaceTable(
    "Sources",
    researchSources.map(
      (item, index) => `
        INSERT INTO dbo.Sources (
          Id,
          Title,
          Publisher,
          Category,
          SourceDate,
          Href,
          Summary,
          SortOrder
        ) VALUES (
          ${nvarchar(item.id)},
          ${nvarchar(item.title)},
          ${nvarchar(item.publisher)},
          ${nvarchar(item.category)},
          ${nvarchar(item.date)},
          ${nvarchar(item.href)},
          ${nvarchar(item.summary)},
          ${index}
        );
      `,
    ),
  );
}

async function seedUpdates() {
  await replaceTable(
    "PlatformUpdates",
    updates.map(
      (item, index) => `
        INSERT INTO dbo.PlatformUpdates (
          Id,
          Title,
          Detail,
          SortOrder
        ) VALUES (
          ${nvarchar(`update-${index + 1}`)},
          ${nvarchar(item.title)},
          ${nvarchar(item.detail)},
          ${index}
        );
      `,
    ),
  );
}

async function main() {
  console.log("Seeding Ga Mawela SQL platform tables...");
  await seedUsers();
  await seedMines();
  await seedCommitments();
  await seedOpportunities();
  await seedDocuments();
  await seedSources();
  await seedUpdates();
  console.log("Ga Mawela SQL platform seed completed.");
}

main().catch((error) => {
  console.error("Failed to seed Ga Mawela SQL platform:", error);
  process.exit(1);
});
