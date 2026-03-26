export const PLATFORM_SQL_DATABASE = "GaMawelaCommunityPlatform";

export function getPlatformSqlConnectionString() {
  return (
    process.env.PLATFORM_SQL_CONNECTION_STRING ??
    process.env.SQL_CONNECTION_STRING ??
    ""
  );
}

export function getPlatformSqlStatus() {
  const connectionString = getPlatformSqlConnectionString();

  return {
    configured: connectionString.length > 0,
    database: PLATFORM_SQL_DATABASE,
    usesIntegratedSecurity: /Integrated Security\s*=\s*True/i.test(connectionString),
  };
}
