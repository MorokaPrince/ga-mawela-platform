"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  MessageSquare,
  Briefcase,
  User,
  LogOut,
  Home,
  Search,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Settings,
} from "lucide-react";

type PlatformDocument = {
  id: string;
  title: string;
  category: string;
  description: string;
  source: string;
  date: string;
  href?: string;
};

type PlatformEngagement = {
  id: string;
  kind: "comment" | "report";
  section: string;
  name: string;
  message: string;
  issueType?: string;
  submittedAt: string;
};

type OpportunityCard = {
  id: string;
  category: string;
  title: string;
  owner: string;
  status: string;
  summary: string;
  howToApply: string;
  href?: string;
};

type TabType = "overview" | "documents" | "submissions" | "opportunities" | "profile";

export default function MemberDashboardFull() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<{ name: string; email: string; role: string } | null>(null);
  
  // Data states
  const [documents, setDocuments] = useState<PlatformDocument[]>([]);
  const [submissions, setSubmissions] = useState<PlatformEngagement[]>([]);
  const [opportunities, setOpportunities] = useState<OpportunityCard[]>([]);
  
  // Search states
  const [docSearch, setDocSearch] = useState("");
  const [oppSearch, setOppSearch] = useState("");
  
  // Profile form
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    preferredLanguage: "en",
    membershipNumber: "",
  });

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/platform-auth/session/");
        const data = await res.json();
        if (data.authenticated) {
          setSession(data.user);
          setProfileForm({
            name: data.user.name || "",
            email: data.user.email || "",
            preferredLanguage: "en",
            membershipNumber: "",
          });
        } else {
          router.push("/login");
        }
      } catch {
        router.push("/login");
      }
    };
    fetchSession();
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === "overview" || activeTab === "documents") {
          const res = await fetch("/api/member/data/?type=documents");
          const data = await res.json();
          if (data.success) setDocuments(data.data);
        }
        
        if (activeTab === "overview" || activeTab === "submissions") {
          const res = await fetch("/api/member/data/?type=submissions");
          const data = await res.json();
          if (data.success) setSubmissions(data.data);
        }
        
        if (activeTab === "overview" || activeTab === "opportunities") {
          const res = await fetch("/api/member/data/?type=opportunities");
          const data = await res.json();
          if (data.success) setOpportunities(data.data);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [activeTab]);

  const handleLogout = async () => {
    try {
      await fetch("/api/platform-auth/logout/", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const filteredDocs = documents.filter(
    (d) =>
      d.title.toLowerCase().includes(docSearch.toLowerCase()) ||
      d.category.toLowerCase().includes(docSearch.toLowerCase())
  );

  const filteredOpps = opportunities.filter(
    (o) =>
      o.title.toLowerCase().includes(oppSearch.toLowerCase()) ||
      o.category.toLowerCase().includes(oppSearch.toLowerCase()) ||
      o.owner.toLowerCase().includes(oppSearch.toLowerCase())
  );

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "submissions", label: "My Submissions", icon: MessageSquare },
    { id: "opportunities", label: "Opportunities", icon: Briefcase },
    { id: "profile", label: "Profile", icon: Settings },
  ];

  return (
    <div className="gm-theme-shell gm-theme-dark min-h-screen">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(209,74,40,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(56,189,248,0.14),transparent_22%),linear-gradient(180deg,var(--gm-background),var(--gm-background-strong))]" />
      <div className="pointer-events-none fixed inset-0 gm-grid-overlay opacity-45" />
      
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[var(--gm-panel-header)] shadow-[0_18px_60px_rgba(7,10,24,0.18)] backdrop-blur-2xl">
        <div className="mx-auto flex w-full max-w-[1800px] flex-col gap-3 px-4 py-3 md:px-6 xl:px-8">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-[0_0_40px_rgba(209,74,40,0.12)]">
                <User size={20} className="text-[var(--gm-foreground)]" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--gm-subtle)]">
                  Member Dashboard
                </p>
                <h1 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-[var(--gm-foreground)]">
                  Ga-Mawela Platform
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-[var(--gm-foreground)] transition hover:bg-white/10"
              >
                <Home size={16} className="inline mr-2" />
                Home
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-[var(--gm-foreground)] transition hover:bg-white/10"
              >
                <LogOut size={16} className="inline mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="relative mx-auto max-w-[1800px] px-4 py-6 md:px-6 xl:px-8">
        {/* Tab Navigation */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center gap-2 rounded-full border px-4 py-3 text-sm transition ${
                activeTab === tab.id
                  ? "border-white/18 bg-white text-slate-950"
                  : "border-white/10 bg-white/[0.04] text-[var(--gm-foreground)] hover:border-white/18 hover:bg-white/[0.08]"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="rounded-[32px] border border-white/10 bg-[var(--gm-panel)] p-6 shadow-[0_24px_120px_rgba(7,10,24,0.32)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-[var(--gm-foreground)]">Welcome, {session?.name}</h2>
                <p className="mt-2 text-sm text-[var(--gm-muted)]">
                  Your personalized dashboard
                </p>
              </div>
              <button
                onClick={() => setActiveTab("overview")}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-[var(--gm-foreground)] transition hover:bg-white/10"
              >
                <RefreshCw size={16} className={`inline mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
                <div className="flex items-center gap-3">
                  <MessageSquare size={20} className="text-blue-400" />
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">My Submissions</p>
                </div>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--gm-foreground)]">{submissions.length}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-green-400" />
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">Available Documents</p>
                </div>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--gm-foreground)]">{documents.length}</p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
                <div className="flex items-center gap-3">
                  <Briefcase size={20} className="text-amber-400" />
                  <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">Opportunities</p>
                </div>
                <p className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--gm-foreground)]">{opportunities.length}</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
                <h3 className="text-base font-medium text-[var(--gm-foreground)]">Quick Actions</h3>
                <div className="mt-4 grid gap-3">
                  <Link href="/#opportunities" className="flex items-center gap-3 rounded-[16px] border border-white/10 bg-white/[0.05] p-3 text-sm text-[var(--gm-foreground)] transition hover:bg-white/10">
                    <Briefcase size={16} className="text-amber-400" />
                    Browse Opportunities
                  </Link>
                  <Link href="/#transparency" className="flex items-center gap-3 rounded-[16px] border border-white/10 bg-white/[0.05] p-3 text-sm text-[var(--gm-foreground)] transition hover:bg-white/10">
                    <MessageSquare size={16} className="text-blue-400" />
                    Add Comment
                  </Link>
                  <Link href="/#report" className="flex items-center gap-3 rounded-[16px] border border-white/10 bg-white/[0.05] p-3 text-sm text-[var(--gm-foreground)] transition hover:bg-white/10">
                    <AlertCircle size={16} className="text-red-400" />
                    Report an Issue
                  </Link>
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
                <h3 className="text-base font-medium text-[var(--gm-foreground)]">Recent Submissions</h3>
                <div className="mt-4 space-y-3">
                  {submissions.slice(0, 3).map((sub) => (
                    <div key={sub.id} className="flex items-center gap-3 rounded-[16px] border border-white/10 bg-white/[0.05] p-3">
                      <CheckCircle size={16} className="text-green-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[var(--gm-foreground)] truncate">{sub.message}</p>
                        <p className="text-xs text-[var(--gm-subtle)]">{sub.submittedAt}</p>
                      </div>
                    </div>
                  ))}
                  {submissions.length === 0 && (
                    <p className="text-sm text-[var(--gm-muted)]">No submissions yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div className="rounded-[32px] border border-white/10 bg-[var(--gm-panel)] p-6 shadow-[0_24px_120px_rgba(7,10,24,0.32)] backdrop-blur-2xl md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-semibold text-[var(--gm-foreground)]">Document Library</h2>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gm-subtle)]" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={docSearch}
                  onChange={(e) => setDocSearch(e.target.value)}
                  className="gm-input h-10 w-64 pl-9"
                  aria-label="Search documents"
                />
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredDocs.map((doc) => (
                <div key={doc.id} className="rounded-[20px] border border-white/10 bg-white/[0.05] p-4">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--gm-subtle)]">
                    {doc.category}
                  </span>
                  <h4 className="mt-2 text-base font-medium text-[var(--gm-foreground)]">{doc.title}</h4>
                  <p className="mt-2 text-xs text-[var(--gm-muted)] line-clamp-2">{doc.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-[var(--gm-subtle)]">{doc.source}</span>
                    {doc.href && (
                      <a
                        href={doc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                      >
                        View <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {filteredDocs.length === 0 && (
              <p className="mt-6 text-center text-[var(--gm-muted)]">No documents found</p>
            )}
          </div>
        )}

        {/* Submissions Tab */}
        {activeTab === "submissions" && (
          <div className="rounded-[32px] border border-white/10 bg-[var(--gm-panel)] p-6 shadow-[0_24px_120px_rgba(7,10,24,0.32)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-[var(--gm-foreground)]">My Submissions</h2>
            </div>

            <div className="mt-6 grid gap-4">
              {submissions.map((sub) => (
                <div key={sub.id} className="rounded-[20px] border border-white/10 bg-white/[0.05] p-4">
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-2 py-1 text-xs ${sub.kind === "report" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`}>
                      {sub.kind}
                    </span>
                    <span className="text-xs text-[var(--gm-subtle)]">{sub.section}</span>
                    <span className="text-xs text-[var(--gm-subtle)]">•</span>
                    <span className="text-xs text-[var(--gm-subtle)]">{sub.submittedAt}</span>
                  </div>
                  <p className="mt-3 text-sm text-[var(--gm-foreground)]">{sub.message}</p>
                  {sub.issueType && (
                    <div className="mt-2">
                      <span className="text-xs text-[var(--gm-subtle)]">Type: </span>
                      <span className="text-xs text-[var(--gm-foreground)]">{sub.issueType}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {submissions.length === 0 && (
              <div className="mt-6 text-center">
                <p className="text-[var(--gm-muted)]">No submissions yet</p>
                <Link href="/#report" className="mt-4 inline-block rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-[var(--gm-foreground)] transition hover:bg-white/20">
                  Make a Submission
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Opportunities Tab */}
        {activeTab === "opportunities" && (
          <div className="rounded-[32px] border border-white/10 bg-[var(--gm-panel)] p-6 shadow-[0_24px_120px_rgba(7,10,24,0.32)] backdrop-blur-2xl md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-semibold text-[var(--gm-foreground)]">Opportunities</h2>
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gm-subtle)]" />
                <input
                  type="text"
                  placeholder="Search opportunities..."
                  value={oppSearch}
                  onChange={(e) => setOppSearch(e.target.value)}
                  className="gm-input h-10 w-64 pl-9"
                  aria-label="Search opportunities"
                />
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {filteredOpps.map((opp) => (
                <div key={opp.id} className="rounded-[20px] border border-white/10 bg-white/[0.05] p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--gm-subtle)]">
                        {opp.category}
                      </span>
                      <h4 className="mt-2 text-base font-medium text-[var(--gm-foreground)]">{opp.title}</h4>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-1 text-xs text-[var(--gm-muted)]">
                      {opp.status}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-[var(--gm-muted)]">{opp.summary}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-[var(--gm-subtle)]">{opp.owner}</span>
                    {opp.href && (
                      <a
                        href={opp.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                      >
                        Apply <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {filteredOpps.length === 0 && (
              <p className="mt-6 text-center text-[var(--gm-muted)]">No opportunities found</p>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="rounded-[32px] border border-white/10 bg-[var(--gm-panel)] p-6 shadow-[0_24px_120px_rgba(7,10,24,0.32)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-[var(--gm-foreground)]">Profile Settings</h2>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
                <h3 className="text-base font-medium text-[var(--gm-foreground)]">Account Information</h3>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-xs text-[var(--gm-subtle)]">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="gm-input mt-1 w-full"
                      aria-label="Full Name"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gm-subtle)]">Email</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      disabled
                      className="gm-input mt-1 w-full opacity-60"
                      aria-label="Email"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gm-subtle)]">Membership Number</label>
                    <input
                      type="text"
                      value={profileForm.membershipNumber}
                      onChange={(e) => setProfileForm({ ...profileForm, membershipNumber: e.target.value })}
                      className="gm-input mt-1 w-full"
                      aria-label="Membership Number"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[var(--gm-subtle)]">Preferred Language</label>
                    <select
                      value={profileForm.preferredLanguage}
                      onChange={(e) => setProfileForm({ ...profileForm, preferredLanguage: e.target.value })}
                      className="gm-input mt-1 w-full"
                      aria-label="Language"
                    >
                      <option value="en">English</option>
                      <option value="nso">Sepedi / Northern Sotho</option>
                    </select>
                  </div>
                </div>
                <button className="mt-6 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-[var(--gm-foreground)] transition hover:bg-white/20">
                  Save Changes
                </button>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
                <h3 className="text-base font-medium text-[var(--gm-foreground)]">Account Status</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between rounded-[16px] border border-white/10 bg-white/[0.05] p-3">
                    <span className="text-sm text-[var(--gm-muted)]">Role</span>
                    <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs text-blue-400 capitalize">
                      {session?.role || "member"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-[16px] border border-white/10 bg-white/[0.05] p-3">
                    <span className="text-sm text-[var(--gm-muted)]">Email Verified</span>
                    <span className="flex items-center gap-1 text-sm text-green-400">
                      <CheckCircle size={14} /> Verified
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-[16px] border border-white/10 bg-white/[0.05] p-3">
                    <span className="text-sm text-[var(--gm-muted)]">Total Submissions</span>
                    <span className="text-sm text-[var(--gm-foreground)]">{submissions.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
