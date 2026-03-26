"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PlatformLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/platform-auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const payload = (await response.json()) as {
        success: boolean;
        error?: string;
        user?: { role: "admin" | "member" };
      };

      if (!response.ok || !payload.success || !payload.user) {
        throw new Error(payload.error || "Sign-in failed");
      }

      router.push(payload.user.role === "admin" ? "/admin/dashboard" : "/member/dashboard");
      router.refresh();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Sign-in failed",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="gm-theme-shell gm-theme-dark min-h-screen">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(209,74,40,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.14),transparent_22%),linear-gradient(180deg,var(--gm-background),var(--gm-background-strong))]" />
      <div className="pointer-events-none fixed inset-0 gm-grid-overlay opacity-45" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-10 md:px-6 xl:px-8">
        <div className="grid w-full gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <section className="rounded-[32px] border border-white/10 bg-[var(--gm-panel)] p-6 shadow-[0_24px_120px_rgba(7,10,24,0.32)] backdrop-blur-2xl md:p-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--gm-subtle)]">
              Access
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[var(--gm-foreground)] md:text-5xl">
              Sign in to the Ga-Mawela platform
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--gm-muted)]">
              This access layer is designed for members, contributors, youth participants, and admins who need to use
              the platform beyond public browsing.
            </p>

            <form className="mt-8 grid gap-4" onSubmit={handleSubmit}>
              <div className="rounded-[26px] border border-white/10 bg-white/[0.04] p-5">
                <p className="text-sm font-medium text-[var(--gm-foreground)]">Demo accounts</p>
                <div className="mt-4 grid gap-3 text-sm text-[var(--gm-muted)]">
                  <p>Admin GM-0001: `admin@gamawela.org` / `Admin@123`</p>
                  <p>Member GM-0002: `member@gamawela.org` / `Member@123`</p>
                  <p>Youth GM-0003: `youth@gamawela.org` / `Youth@123`</p>
                  <p>Records GM-0004: `records@gamawela.org` / `Records@123`</p>
                </div>
              </div>

              <label className="space-y-2">
                <span className="text-sm text-[var(--gm-muted)]">Email</span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="gm-input"
                  placeholder="you@example.com"
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm text-[var(--gm-muted)]">Password</span>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  className="gm-input"
                  placeholder="Password"
                />
              </label>

              {error ? (
                <div className="rounded-[20px] border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
                  {error}
                </div>
              ) : null}

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-white px-5 py-3 text-sm font-medium text-slate-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
                <Link
                  href="/"
                  className="rounded-full border border-white/15 px-5 py-3 text-sm text-[var(--gm-foreground)] transition hover:bg-white/10"
                >
                  Return home
                </Link>
              </div>
            </form>
          </section>

          <section className="rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-6 backdrop-blur-2xl md:p-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--gm-subtle)]">
              Roles
            </p>
            <div className="mt-5 grid gap-4">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.06] p-5">
                <p className="text-lg font-medium text-[var(--gm-foreground)]">Member dashboard</p>
                <p className="mt-3 text-sm leading-6 text-[var(--gm-muted)]">
                  Gives members and youth participants a cleaner place to track opportunities, comments, and platform contribution.
                </p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.06] p-5">
                <p className="text-lg font-medium text-[var(--gm-foreground)]">Admin dashboard</p>
                <p className="mt-3 text-sm leading-6 text-[var(--gm-muted)]">
                  Gives admins oversight of participation entries, transparency workload, and the next content operations steps.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
