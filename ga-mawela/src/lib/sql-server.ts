export const PLATFORM_SQL_DATABASE = "GaMawelaCommunityPlatform";
export const DEFAULT_PLATFORM_SQL_CONNECTION_STRING =
  "Data Source=DESKTOP-48MI1BR;Integrated Security=True;Persist Security Info=False;Pooling=False;MultipleActiveResultSets=False;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;Packet Size=4096;Command Timeout=0";

export function getPlatformSqlConnectionString() {
  return (
    process.env.PLATFORM_SQL_CONNECTION_STRING ??
    process.env.SQL_CONNECTION_STRING ??
    DEFAULT_PLATFORM_SQL_CONNECTION_STRING
  );
}

export function getPlatformSqlDataSource(connectionString = getPlatformSqlConnectionString()) {
  const match =
    connectionString.match(/(?:Data Source|Server)\s*=\s*([^;]+)/i) ??
    connectionString.match(/Address\s*=\s*([^;]+)/i);

  return match?.[1]?.trim() ?? "";
}

export function getPlatformSqlStatus() {
  const connectionString = getPlatformSqlConnectionString();

  return {
    configured: connectionString.length > 0,
    database: PLATFORM_SQL_DATABASE,
    dataSource: getPlatformSqlDataSource(connectionString),
    usesIntegratedSecurity: /Integrated Security\s*=\s*True/i.test(connectionString),
    usesDefaultLocalConnection:
      connectionString === DEFAULT_PLATFORM_SQL_CONNECTION_STRING,
  };
}
