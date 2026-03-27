"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Users,
  FileText,
  MessageSquare,
  BarChart3,
  Shield,
  Database,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Check,
  X,
  Search,
  RefreshCw,
  Home,
} from "lucide-react";

type PlatformUser = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "member";
  membershipNumber?: string | null;
  preferredLanguage?: string | null;
};

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

type SystemStatus = {
  sql: { connected: boolean; error?: string };
  users: number;
  documents: number;
  sources: number;
  updates: number;
};

type TabType = "overview" | "users" | "documents" | "engagement" | "system";

export default function AdminDashboardFull() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<{ name: string; email: string; role: string } | null>(null);
  
  // Data states
  const [users, setUsers] = useState<PlatformUser[]>([]);
  const [documents, setDocuments] = useState<PlatformDocument[]>([]);
  const [engagement, setEngagement] = useState<PlatformEngagement[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  
  // Form states
  const [showUserForm, setShowUserForm] = useState(false);
  const [showDocForm, setShowDocForm] = useState(false);
  const [editingUser, setEditingUser] = useState<PlatformUser | null>(null);
  const [editingDoc, setEditingDoc] = useState<PlatformDocument | null>(null);
  
  // Search/filter states
  const [userSearch, setUserSearch] = useState("");
  const [docSearch, setDocSearch] = useState("");
  const [engagementFilter, setEngagementFilter] = useState<"all" | "comment" | "report">("all");
  
  // Form data
  const [userForm, setUserForm] = useState({
    email: "",
    name: "",
    role: "member" as "admin" | "member",
    membershipNumber: "",
    preferredLanguage: "en",
  });
  
  const [docForm, setDocForm] = useState({
    title: "",
    category: "PAIA Requests",
    description: "",
    source: "",
    date: new Date().toISOString().slice(0, 10),
    href: "",
  });

  // Load session on mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/platform-auth/session/");
        const data = await res.json();
        if (data.authenticated) {
          setSession(data.user);
        } else {
          router.push("/login");
        }
      } catch {
        router.push("/login");
      }
    };
    fetchSession();
  }, [router]);

  // Load data based on active tab
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === "overview" || activeTab === "system") {
          const res = await fetch("/api/platform-overview/");
          const data = await res.json();
          if (data.success) setSystemStatus(data.system);
        } else if (activeTab === "users") {
          const res = await fetch("/api/admin/users/");
          const data = await res.json();
          if (data.success) setUsers(data.data);
        } else if (activeTab === "documents") {
          const res = await fetch("/api/admin/documents/");
          const data = await res.json();
          if (data.success) setDocuments(data.data);
        } else if (activeTab === "engagement") {
          const res = await fetch("/api/admin/engagement/");
          const data = await res.json();
          if (data.success) setEngagement(data.data);
        }
      } catch (error) {
        console.error("Failed to load data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [activeTab]);

  const handleCreateUser = async () => {
    try {
      const res = await fetch("/api/admin/users/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userForm),
      });
      const data = await res.json();
      if (data.success) {
        setShowUserForm(false);
        setUserForm({ email: "", name: "", role: "member", membershipNumber: "", preferredLanguage: "en" });
        // Reload users
        const res = await fetch("/api/admin/users/");
        const data = await res.json();
        if (data.success) setUsers(data.data);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    try {
      const res = await fetch("/api/admin/users/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingUser.id,
          email: userForm.email,
          name: userForm.name,
          role: userForm.role,
          membershipNumber: userForm.membershipNumber,
          preferredLanguage: userForm.preferredLanguage,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEditingUser(null);
        setShowUserForm(false);
        // Reload users
        const res = await fetch("/api/admin/users/");
        const data = await res.json();
        if (data.success) setUsers(data.data);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`/api/admin/users/?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        // Reload users
        const res = await fetch("/api/admin/users/");
        const data = await res.json();
        if (data.success) setUsers(data.data);
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleCreateDocument = async () => {
    try {
      const res = await fetch("/api/admin/documents/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(docForm),
      });
      const data = await res.json();
      if (data.success) {
        setShowDocForm(false);
        setDocForm({ title: "", category: "PAIA Requests", description: "", source: "", date: new Date().toISOString().slice(0, 10), href: "" });
        // Reload documents
        const res = await fetch("/api/admin/documents/");
        const data = await res.json();
        if (data.success) setDocuments(data.data);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Failed to create document:", error);
    }
  };

  const handleUpdateDocument = async () => {
    if (!editingDoc) return;
    try {
      const res = await fetch("/api/admin/documents/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingDoc.id,
          title: docForm.title,
          category: docForm.category,
          description: docForm.description,
          source: docForm.source,
          date: docForm.date,
          href: docForm.href,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEditingDoc(null);
        setShowDocForm(false);
        // Reload documents
        const res = await fetch("/api/admin/documents/");
        const data = await res.json();
        if (data.success) setDocuments(data.data);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Failed to update document:", error);
    }
  };

  const handleDeleteDocument = async (id: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return;
    try {
      const res = await fetch(`/api/admin/documents/?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        // Reload documents
        const res = await fetch("/api/admin/documents/");
        const data = await res.json();
        if (data.success) setDocuments(data.data);
      }
    } catch (error) {
      console.error("Failed to delete document:", error);
    }
  };

  const handleModerateEngagement = async (id: string, action: "approve" | "reject" | "delete") => {
    try {
      const res = await fetch("/api/admin/engagement/", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action }),
      });
      const data = await res.json();
      if (data.success) {
        // Reload engagement
        const res = await fetch("/api/admin/engagement/");
        const data = await res.json();
        if (data.success) setEngagement(data.data);
      }
    } catch (error) {
      console.error("Failed to moderate engagement:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/platform-auth/logout/", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredDocs = documents.filter(
    (d) =>
      d.title.toLowerCase().includes(docSearch.toLowerCase()) ||
      d.category.toLowerCase().includes(docSearch.toLowerCase()) ||
      d.source.toLowerCase().includes(docSearch.toLowerCase())
  );

  const filteredEngagement = engagement.filter(
    (e) => engagementFilter === "all" || e.kind === engagementFilter
  );

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "users", label: "Users", icon: Users },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "engagement", label: "Engagement", icon: MessageSquare },
    { id: "system", label: "System", icon: Database },
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
                <Shield size={20} className="text-[var(--gm-foreground)]" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--gm-subtle)]">
                  Admin Dashboard
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
                <h2 className="text-2xl font-semibold text-[var(--gm-foreground)]">Platform Overview</h2>
                <p className="mt-2 text-sm text-[var(--gm-muted)]">
                  Welcome back, {session?.name}
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

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">Total Users</p>
                <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--gm-foreground)]">
                  {systemStatus?.users || 0}
                </p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">Documents</p>
                <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--gm-foreground)]">
                  {systemStatus?.documents || 0}
                </p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">Sources</p>
                <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--gm-foreground)]">
                  {systemStatus?.sources || 0}
                </p>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">Updates</p>
                <p className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--gm-foreground)]">
                  {systemStatus?.updates || 0}
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
              <p className="text-[11px] uppercase tracking-[0.24em] text-[var(--gm-subtle)]">System Status</p>
              <div className="mt-4 flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${systemStatus?.sql?.connected ? "bg-green-500" : "bg-red-500"}`} />
                <span className="text-sm text-[var(--gm-foreground)]">
                  {systemStatus?.sql?.connected ? "Database Connected" : "Database Disconnected"}
                </span>
                {systemStatus?.sql?.error && (
                  <span className="text-xs text-red-400">({systemStatus.sql.error})</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="rounded-[32px] border border-white/10 bg-[var(--gm-panel)] p-6 shadow-[0_24px_120px_rgba(7,10,24,0.32)] backdrop-blur-2xl md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-semibold text-[var(--gm-foreground)]">User Management</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--gm-subtle)]" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="gm-input h-10 w-64 pl-9"
                    aria-label="Search users"
                  />
                </div>
                <button
                  onClick={() => { setShowUserForm(true); setEditingUser(null); setUserForm({ email: "", name: "", role: "member", membershipNumber: "", preferredLanguage: "en" }); }}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-[var(--gm-foreground)] transition hover:bg-white/20"
                >
                  <Plus size={16} className="inline mr-2" />
                  Add User
                </button>
              </div>
            </div>

            {/* User Form Modal */}
            {(showUserForm || editingUser) && (
              <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
                <h3 className="text-lg font-medium text-[var(--gm-foreground)]">
                  {editingUser ? "Edit User" : "Create New User"}
                </h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <input
                    type="email"
                    placeholder="Email"
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    className="gm-input"
                    aria-label="Email"
                  />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={userForm.name}
                    onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                    className="gm-input"
                    aria-label="Full Name"
                  />
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value as "admin" | "member" })}
                    className="gm-input"
                    aria-label="Role"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Membership Number"
                    value={userForm.membershipNumber}
                    onChange={(e) => setUserForm({ ...userForm, membershipNumber: e.target.value })}
                    className="gm-input"
                    aria-label="Membership Number"
                  />
                  <select
                    value={userForm.preferredLanguage}
                    onChange={(e) => setUserForm({ ...userForm, preferredLanguage: e.target.value })}
                    className="gm-input"
                    aria-label="Language"
                  >
                    <option value="en">English</option>
                    <option value="nso">Sepedi</option>
                  </select>
                </div>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={editingUser ? handleUpdateUser : handleCreateUser}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-[var(--gm-foreground)] transition hover:bg-white/20"
                  >
                    {editingUser ? "Update" : "Create"}
                  </button>
                  <button
                    onClick={() => { setShowUserForm(false); setEditingUser(null); }}
                    className="rounded-full border border-white/15 px-4 py-2 text-sm text-[var(--gm-muted)] transition hover:bg-white/10"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Users Table */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-3 text-left text-xs uppercase tracking-[0.24em] text-[var(--gm-subtle)]">Name</th>
                    <th className="pb-3 text-left text-xs uppercase tracking-[0.24em] text-[var(--gm-subtle)]">Email</th>
                    <th className="pb-3 text-left text-xs uppercase tracking-[0.24em] text-[var(--gm-subtle)]">Role</th>
                    <th className="pb-3 text-left text-xs uppercase tracking-[0.24em] text-[var(--gm-subtle)]">Membership</th>
                    <th className="pb-3 text-left text-xs uppercase tracking-[0.24em] text-[var(--gm-subtle)]">Language</th>
                    <th className="pb-3 text-right text-xs uppercase tracking-[0.24em] text-[var(--gm-subtle)]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-white/5">
                      <td className="py-3 text-sm text-[var(--gm-foreground)]">{user.name}</td>
                      <td className="py-3 text-sm text-[var(--gm-muted)]">{user.email}</td>
                      <td className="py-3">
                        <span className={`rounded-full px-2 py-1 text-xs ${user.role === "admin" ? "bg-amber-500/20 text-amber-400" : "bg-blue-500/20 text-blue-400"}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-[var(--gm-muted)]">{user.membershipNumber || "-"}</td>
                      <td className="py-3 text-sm text-[var(--gm-muted)]">{user.preferredLanguage || "en"}</td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => { setEditingUser(user); setUserForm({ email: user.email, name: user.name, role: user.role, membershipNumber: user.membershipNumber || "", preferredLanguage: user.preferredLanguage || "en" }); setShowUserForm(true); }}
                          className="mr-2 text-[var(--gm-muted)] hover:text-[var(--gm-foreground)]"
                          aria-label="Edit user"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-400 hover:text-red-300"
                          aria-label="Delete user"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                <p className="mt-4 text-center text-[var(--gm-muted)]">No users found</p>
              )}
            </div>
          </div>
        )}

        {/* Documents Tab */}
        {activeTab === "documents" && (
          <div className="rounded-[32px] border border-white/10 bg-[var(--gm-panel)] p-6 shadow-[0_24px_120px_rgba(7,10,24,0.32)] backdrop-blur-2xl md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-semibold text-[var(--gm-foreground)]">Document Management</h2>
              <div className="flex gap-3">
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
                <button
                  onClick={() => { setShowDocForm(true); setEditingDoc(null); setDocForm({ title: "", category: "PAIA Requests", description: "", source: "", date: new Date().toISOString().slice(0, 10), href: "" }); }}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-[var(--gm-foreground)] transition hover:bg-white/20"
                >
                  <Plus size={16} className="inline mr-2" />
                  Add Document
                </button>
              </div>
            </div>

            {/* Document Form Modal */}
            {(showDocForm || editingDoc) && (
              <div className="mt-6 rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
                <h3 className="text-lg font-medium text-[var(--gm-foreground)]">
                  {editingDoc ? "Edit Document" : "Create New Document"}
                </h3>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Title"
                    value={docForm.title}
                    onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
                    className="gm-input md:col-span-2"
                    aria-label="Title"
                  />
                  <select
                    value={docForm.category}
                    onChange={(e) => setDocForm({ ...docForm, category: e.target.value })}
                    className="gm-input"
                    aria-label="Category"
                  >
                    <option value="PAIA Requests">PAIA Requests</option>
                    <option value="SLP Reports">SLP Reports</option>
                    <option value="Environmental">Environmental</option>
                    <option value="Legal Frameworks">Legal Frameworks</option>
                    <option value="Research">Research</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Source"
                    value={docForm.source}
                    onChange={(e) => setDocForm({ ...docForm, source: e.target.value })}
                    className="gm-input"
                    aria-label="Source"
                  />
                  <input
                    type="date"
                    value={docForm.date}
                    onChange={(e) => setDocForm({ ...docForm, date: e.target.value })}
                    className="gm-input"
                    aria-label="Date"
                  />
                  <input
                    type="url"
                    placeholder="URL (optional)"
                    value={docForm.href}
                    onChange={(e) => setDocForm({ ...docForm, href: e.target.value })}
                    className="gm-input md:col-span-2"
                    aria-label="URL"
                  />
                  <textarea
                    placeholder="Description"
                    value={docForm.description}
                    onChange={(e) => setDocForm({ ...docForm, description: e.target.value })}
                    className="gm-input md:col-span-2 min-h-[80px]"
                    aria-label="Description"
                  />
                </div>
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={editingDoc ? handleUpdateDocument : handleCreateDocument}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-[var(--gm-foreground)] transition hover:bg-white/20"
                  >
                    {editingDoc ? "Update" : "Create"}
                  </button>
                  <button
                    onClick={() => { setShowDocForm(false); setEditingDoc(null); }}
                    className="rounded-full border border-white/15 px-4 py-2 text-sm text-[var(--gm-muted)] transition hover:bg-white/10"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Documents Grid */}
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredDocs.map((doc) => (
                <div key={doc.id} className="rounded-[20px] border border-white/10 bg-white/[0.05] p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--gm-subtle)]">
                        {doc.category}
                      </span>
                      <h4 className="mt-2 text-base font-medium text-[var(--gm-foreground)]">{doc.title}</h4>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => { setEditingDoc(doc); setDocForm({ title: doc.title, category: doc.category, description: doc.description, source: doc.source, date: doc.date, href: doc.href || "" }); setShowDocForm(true); }}
                        className="rounded-full p-2 text-[var(--gm-muted)] hover:bg-white/10"
                        aria-label="Edit document"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteDocument(doc.id)}
                        className="rounded-full p-2 text-red-400 hover:bg-white/10"
                        aria-label="Delete document"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-[var(--gm-muted)] line-clamp-2">{doc.description}</p>
                  <div className="mt-4 flex items-center justify-between text-xs text-[var(--gm-subtle)]">
                    <span>{doc.source}</span>
                    <span>{doc.date}</span>
                  </div>
                </div>
              ))}
            </div>
            {filteredDocs.length === 0 && (
              <p className="mt-6 text-center text-[var(--gm-muted)]">No documents found</p>
            )}
          </div>
        )}

        {/* Engagement Tab */}
        {activeTab === "engagement" && (
          <div className="rounded-[32px] border border-white/10 bg-[var(--gm-panel)] p-6 shadow-[0_24px_120px_rgba(7,10,24,0.32)] backdrop-blur-2xl md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-semibold text-[var(--gm-foreground)]">Engagement Moderation</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setEngagementFilter("all")}
                  className={`rounded-full border px-3 py-1 text-xs transition ${engagementFilter === "all" ? "border-white/18 bg-white text-slate-950" : "border-white/10 text-[var(--gm-muted)]"}`}
                >
                  All
                </button>
                <button
                  onClick={() => setEngagementFilter("comment")}
                  className={`rounded-full border px-3 py-1 text-xs transition ${engagementFilter === "comment" ? "border-white/18 bg-white text-slate-950" : "border-white/10 text-[var(--gm-muted)]"}`}
                >
                  Comments
                </button>
                <button
                  onClick={() => setEngagementFilter("report")}
                  className={`rounded-full border px-3 py-1 text-xs transition ${engagementFilter === "report" ? "border-white/18 bg-white text-slate-950" : "border-white/10 text-[var(--gm-muted)]"}`}
                >
                  Reports
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {filteredEngagement.map((entry) => (
                <div key={entry.id} className="rounded-[20px] border border-white/10 bg-white/[0.05] p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className={`rounded-full px-2 py-1 text-xs ${entry.kind === "report" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`}>
                        {entry.kind}
                      </span>
                      <span className="text-xs text-[var(--gm-subtle)]">{entry.section}</span>
                      <span className="text-xs text-[var(--gm-subtle)]">•</span>
                      <span className="text-xs text-[var(--gm-subtle)]">{entry.submittedAt}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleModerateEngagement(entry.id, "approve")}
                        className="rounded-full border border-white/10 p-2 text-green-400 hover:bg-white/10"
                        aria-label="Approve"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        onClick={() => handleModerateEngagement(entry.id, "reject")}
                        className="rounded-full border border-white/10 p-2 text-amber-400 hover:bg-white/10"
                        aria-label="Reject"
                      >
                        <X size={14} />
                      </button>
                      <button
                        onClick={() => handleModerateEngagement(entry.id, "delete")}
                        className="rounded-full border border-white/10 p-2 text-red-400 hover:bg-white/10"
                        aria-label="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-[var(--gm-foreground)]">{entry.name}</p>
                  <p className="mt-2 text-sm text-[var(--gm-muted)]">{entry.message}</p>
                  {entry.issueType && (
                    <div className="mt-3">
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--gm-subtle)]">Issue Type:</span>
                      <span className="ml-2 text-xs text-[var(--gm-foreground)]">{entry.issueType}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            {filteredEngagement.length === 0 && (
              <p className="mt-6 text-center text-[var(--gm-muted)]">No engagement entries found</p>
            )}
          </div>
        )}

        {/* System Tab */}
        {activeTab === "system" && (
          <div className="rounded-[32px] border border-white/10 bg-[var(--gm-panel)] p-6 shadow-[0_24px_120px_rgba(7,10,24,0.32)] backdrop-blur-2xl md:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-[var(--gm-foreground)]">System Status</h2>
              <button
                onClick={() => setActiveTab("system")}
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-[var(--gm-foreground)] transition hover:bg-white/10"
              >
                <RefreshCw size={16} className={`inline mr-2 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[20px] border border-white/10 bg-white/[0.05] p-5">
                <div className="flex items-center gap-3">
                  <div className={`h-4 w-4 rounded-full ${systemStatus?.sql?.connected ? "bg-green-500" : "bg-red-500"}`} />
                  <h4 className="text-base font-medium text-[var(--gm-foreground)]">Database</h4>
                </div>
                <p className="mt-3 text-sm text-[var(--gm-muted)]">
                  {systemStatus?.sql?.connected ? "Connected to SQL Server" : "Disconnected - using local fallback"}
                </p>
                {systemStatus?.sql?.error && (
                  <p className="mt-2 text-xs text-red-400">{systemStatus.sql.error}</p>
                )}
              </div>

              <div className="rounded-[20px] border border-white/10 bg-white/[0.05] p-5">
                <h4 className="text-base font-medium text-[var(--gm-foreground)]">Statistics</h4>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[var(--gm-subtle)]">Users</p>
                    <p className="text-2xl font-semibold text-[var(--gm-foreground)]">{systemStatus?.users || 0}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--gm-subtle)]">Documents</p>
                    <p className="text-2xl font-semibold text-[var(--gm-foreground)]">{systemStatus?.documents || 0}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--gm-subtle)]">Sources</p>
                    <p className="text-2xl font-semibold text-[var(--gm-foreground)]">{systemStatus?.sources || 0}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--gm-subtle)]">Updates</p>
                    <p className="text-2xl font-semibold text-[var(--gm-foreground)]">{systemStatus?.updates || 0}</p>
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
