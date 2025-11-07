'use client';

import { SessionProvider } from "next-auth/react";
import ErrorBoundary from "./ErrorBoundary";
import SmoothScrollProvider from "./SmoothScrollProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ErrorBoundary>
        <SmoothScrollProvider />
        {children}
      </ErrorBoundary>
    </SessionProvider>
  );
}

