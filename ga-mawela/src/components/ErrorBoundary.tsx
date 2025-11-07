'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console and potentially to logging service
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    // Import logger dynamically to avoid circular dependencies
    import('../lib/logger').then(({ logError }) => {
      logError(error, {
        context: {
          componentStack: errorInfo.componentStack,
          errorBoundary: true
        }
      });
    });
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

const DefaultErrorFallback: React.FC<{ error?: Error; resetError: () => void }> = ({ error, resetError }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-900">
    <div className="max-w-md w-full bg-slate-800 shadow-lg rounded-lg p-6 border border-slate-700">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-white">
            Something went wrong
          </h3>
          <div className="mt-2 text-sm text-gray-100">
            <p>An unexpected error occurred. Please try refreshing the page.</p>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                type="button"
                onClick={resetError}
                className="bg-red-900 px-2 py-1.5 rounded-md text-sm font-medium text-red-100 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-red-600"
              >
                Try again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ErrorBoundary;