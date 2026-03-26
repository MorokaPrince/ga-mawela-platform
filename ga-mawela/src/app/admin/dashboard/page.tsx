import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  minePoints,
  opportunities,
  slpCommitments,
  transparencyMatrixRows,
} from "@/data/platformData";
import {
  PLATFORM_SESSION_COOKIE,
  verifyPlatformSessionToken,
} from "@/lib/platform-auth";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const session = verifyPlatformSessionToken(
    cookieStore.get(PLATFORM_SESSION_COOKIE)?.value,
  );

  if (!session || session.role !== "admin") {
    redirect("/login");
  }

  return (
    <main className="gm-theme-shell gm-theme-dark min-h-screen">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(209,74,40,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.14),transparent_22%),linear-gradient(180deg,var(--gm-background),var(--gm-background-strong))]" />
      <div className="pointer-events-none fixed inset-0 gm-grid-overlay opacity-45" />
      <div className="relative mx-auto max-w-7xl px-4 py-8 md:px-6 xl:px-8">
        <div className="rounded-[32px] border border-white/10 bg-[var(--gm-panel)] p-6 shadow-[0_24px_120px_rgba(7,10,24,0.32)] backdrop-blur-2xl md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--gm-subtle)]">
                Admin dashboard
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--gm-foreground)]">
                Welcome back, {session.name}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--gm-muted)]">
                This workspace gives administrators a cleaner operating view of the platform, participation flow, and the accountability surface now live on the main app.
              </p>
            </div>
            <Link
              href="/"
              className="rounded-full border border-white/15 px-5 py-3 text-sm text-[var(--gm-foreground)] transition hover:bg-white/10"
            >
              Return to landing
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">Mapped assets</p>
              <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--gm-foreground)]">{minePoints.length}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">SLP records</p>
              <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--gm-foreground)]">{slpCommitments.length}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">Opportunity channels</p>
              <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--gm-foreground)]">{opportunities.length}</p>
            </div>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">Matrix categories</p>
              <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--gm-foreground)]">{transparencyMatrixRows.length}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
            <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.028))] p-5 backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                Operations priorities
              </p>
              <div className="mt-5 grid gap-3">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4 text-sm leading-6 text-[var(--gm-muted)]">
                  Move curated corridor data into the live database once the SQL authentication issue is resolved.
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4 text-sm leading-6 text-[var(--gm-muted)]">
                  Moderate community comments and reports as participation increases.
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4 text-sm leading-6 text-[var(--gm-muted)]">
                  Connect upload workflow, document approval, and role-based review for a fuller operations console.
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.028))] p-5 backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                Role and status
              </p>
              <div className="mt-5 grid gap-3">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-sm text-[var(--gm-muted)]">Signed in as</p>
                  <p className="mt-2 text-lg font-medium text-[var(--gm-foreground)]">{session.email}</p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-sm text-[var(--gm-muted)]">Role</p>
                  <p className="mt-2 text-lg font-medium capitalize text-[var(--gm-foreground)]">{session.role}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
