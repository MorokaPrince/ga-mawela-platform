export const PLATFORM_SQL_DATABASE = "GaMawelaCommunityPlatform";
export const DEFAULT_PLATFORM_SQL_CONNECTION_STRING =
  "Data Source=DESKTOP-48MI1BR;Integrated Security=True;Persist Security Info=False;Pooling=False;MultipleActiveResultSets=False;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;Packet Size=4096;Command Timeout=0";

export function getPlatformSqlConnectionString() {
  const envConnectionString = process.env.PLATFORM_SQL_CONNECTION_STRING ?? process.env.SQL_CONNECTION_STRING;
  
  // If explicitly set to empty string or "none", return empty to use fallback data
  // This enables deployment without a database
  if (envConnectionString === "" || envConnectionString?.toLowerCase() === "none") {
    return "";
  }
  
  // Use default only if no environment variable is set AND we're not in a serverless environment
  // Check for common serverless/vercel environment indicators
  const isServerless = !!(
    process.env.VERCEL ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.NETLIFY ||
    process.env.NODE_ENV === "production"
  );
  
  // In serverless production, default to empty to use fallback data
  if (isServerless && !envConnectionString) {
    return "";
  }
  
  return envConnectionString ?? DEFAULT_PLATFORM_SQL_CONNECTION_STRING;
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
