import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { opportunities, updates } from "@/data/platformData";
import {
  PLATFORM_SESSION_COOKIE,
  verifyPlatformSessionToken,
} from "@/lib/platform-auth";

export default async function MemberDashboard() {
  const cookieStore = await cookies();
  const session = verifyPlatformSessionToken(
    cookieStore.get(PLATFORM_SESSION_COOKIE)?.value,
  );

  if (!session) {
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
                Member dashboard
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--gm-foreground)]">
                Welcome, {session.name}
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--gm-muted)]">
                This dashboard is designed for members and youth participants who want a faster route into opportunities, transparency contribution, and platform participation.
              </p>
            </div>
            <Link
              href="/"
              className="rounded-full border border-white/15 px-5 py-3 text-sm text-[var(--gm-foreground)] transition hover:bg-white/10"
            >
              Return to landing
            </Link>
          </div>

          <div className="mt-8 grid gap-5 xl:grid-cols-[1fr_0.92fr]">
            <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.028))] p-5 backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                Quick routes
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <Link href="/#opportunities" className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4 text-sm text-[var(--gm-foreground)] transition hover:bg-white/[0.08]">
                  Opportunities
                </Link>
                <Link href="/#transparency" className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4 text-sm text-[var(--gm-foreground)] transition hover:bg-white/[0.08]">
                  Transparency
                </Link>
                <Link href="/#report" className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4 text-sm text-[var(--gm-foreground)] transition hover:bg-white/[0.08]">
                  Report an issue
                </Link>
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.028))] p-5 backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                Account
              </p>
              <div className="mt-5 grid gap-3">
                <div className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-sm text-[var(--gm-muted)]">Email</p>
                  <p className="mt-2 text-lg font-medium text-[var(--gm-foreground)]">{session.email}</p>
                </div>
                <div className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4">
                  <p className="text-sm text-[var(--gm-muted)]">Visible role</p>
                  <p className="mt-2 text-lg font-medium capitalize text-[var(--gm-foreground)]">{session.role}</p>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-8 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
            <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.028))] p-5 backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                Opportunity watch
              </p>
              <div className="mt-5 grid gap-3">
                {opportunities.map((item) => (
                  <div key={item.id} className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4">
                    <p className="text-base font-medium text-[var(--gm-foreground)]">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--gm-muted)]">{item.summary}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.028))] p-5 backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">
                Latest platform signals
              </p>
              <div className="mt-5 grid gap-3">
                {updates.map((item) => (
                  <div key={item.title} className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4">
                    <p className="text-base font-medium text-[var(--gm-foreground)]">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--gm-muted)]">{item.detail}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
