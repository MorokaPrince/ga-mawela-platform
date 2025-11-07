interface ErrorContext {
  [key: string]: unknown;
}

interface LogErrorOptions {
  level?: 'error' | 'warn' | 'info';
  context?: ErrorContext;
  userId?: string; // Optional, but ensure no PII is logged
  sessionId?: string; // Optional, anonymized session identifier
}

export const logError = async (
  error: Error | string,
  options: LogErrorOptions = {}
): Promise<void> => {
  const {
    level = 'error',
    context = {},
    userId,
    sessionId
  } = options;

  const errorMessage = error instanceof Error ? error.message : error;
  const errorStack = error instanceof Error ? error.stack : undefined;

  // Create log entry with privacy-first approach
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message: errorMessage,
    stack: errorStack,
    context: {
      ...context,
      // Only include anonymized identifiers if available
      ...(userId && { userId: hashUserId(userId) }), // Hash user ID for privacy
      ...(sessionId && { sessionId }),
      // Add environment info without PII
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
      // Avoid logging IP addresses, personal data, etc.
    }
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('[Error Logger]', logEntry);
  }

  // Send to logging service (server-side or external service)
  try {
    if (typeof window !== 'undefined') {
      // Client-side: send to API route
      await fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logEntry),
      });
    } else {
      // Server-side: could integrate with services like Sentry, LogRocket, etc.
      // For now, just console log (in production, this would be replaced)
      console.error('[Server Error Logger]', logEntry);
    }
  } catch (loggingError) {
    // Fallback: log the logging error to console
    console.error('Failed to send error log:', loggingError);
  }
};

// Simple hash function for anonymizing user IDs
const hashUserId = (userId: string): string => {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    const char = userId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
};

// Utility for logging info messages
export const logInfo = (message: string, context?: ErrorContext): void => {
  logError(message, { level: 'info', context });
};

// Utility for logging warnings
export const logWarn = (message: string, context?: ErrorContext): void => {
  logError(message, { level: 'warn', context });
};