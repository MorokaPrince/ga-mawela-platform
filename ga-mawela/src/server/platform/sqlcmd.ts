import "server-only";

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import {
  getPlatformSqlDataSource,
  getPlatformSqlStatus,
  PLATFORM_SQL_DATABASE,
} from "@/lib/sql-server";

const execFileAsync = promisify(execFile);

function shouldSkipSqlcmdDuringBuild() {
  return process.env.npm_lifecycle_event === "build";
}

function getSqlServerTarget() {
  const dataSource = getPlatformSqlDataSource();

  if (!dataSource) {
    throw new Error("PLATFORM_SQL_CONNECTION_STRING is missing a Data Source value.");
  }

  return dataSource;
}

function createSqlcmdArgs(query: string, database = PLATFORM_SQL_DATABASE) {
  return [
    "-S",
    getSqlServerTarget(),
    "-E",
    "-d",
    database,
    "-W",
    "-h",
    "-1",
    "-w",
    "65535",
    "-y",
    "0",
    "-Y",
    "0",
    "-Q",
    `SET NOCOUNT ON; ${query}`,
  ];
}

export function escapeSqlString(value: string) {
  return value.replace(/'/g, "''");
}

export function toSqlNullableString(value?: string | null) {
  if (!value) {
    return "NULL";
  }

  return `N'${escapeSqlString(value)}'`;
}

export function toSqlBit(value: boolean) {
  return value ? "1" : "0";
}

export function toSqlNumber(value?: number | null) {
  return typeof value === "number" ? String(value) : "NULL";
}

export async function runPlatformSqlCommand(
  query: string,
  database = PLATFORM_SQL_DATABASE,
) {
  if (shouldSkipSqlcmdDuringBuild()) {
    return "";
  }

  const { stdout, stderr } = await execFileAsync("sqlcmd", createSqlcmdArgs(query, database), {
    windowsHide: true,
    maxBuffer: 8 * 1024 * 1024,
  });

  if (stderr?.trim()) {
    throw new Error(stderr.trim());
  }

  return stdout.trim();
}

export async function runPlatformSqlJsonQuery<T>(
  query: string,
  database = PLATFORM_SQL_DATABASE,
  fallback: T,
) {
  try {
    const output = await runPlatformSqlCommand(query, database);
    if (!output) {
      return fallback;
    }

    return JSON.parse(output) as T;
  } catch {
    return fallback;
  }
}

export function getPlatformSqlRuntimeStatus() {
  return {
    ...getPlatformSqlStatus(),
    serverTarget: getPlatformSqlDataSource(),
  };
}
