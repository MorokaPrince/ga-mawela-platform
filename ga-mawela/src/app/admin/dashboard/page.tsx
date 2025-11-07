// Admin dashboard - temporarily disabled pending database configuration
export default function AdminDashboard() {
  // Mock stats for development
  const stats = {
    total: 0,
    draft: 0,
    pending: 0,
    approved: 0,
    published: 0,
  }

  return (
    <div className="min-h-screen bg-gm-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gm-900 mb-8">Admin Dashboard</h1>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-soft">
            <h3 className="text-sm font-medium text-gm-600">Total Investigations</h3>
            <p className="text-2xl font-bold text-gm-900">{stats.total}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-soft">
            <h3 className="text-sm font-medium text-gm-600">Draft</h3>
            <p className="text-2xl font-bold text-gm-900">{stats.draft}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-soft">
            <h3 className="text-sm font-medium text-gm-600">Pending</h3>
            <p className="text-2xl font-bold text-gm-900">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-soft">
            <h3 className="text-sm font-medium text-gm-600">Approved</h3>
            <p className="text-2xl font-bold text-gm-900">{stats.approved}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-soft">
            <h3 className="text-sm font-medium text-gm-600">Published</h3>
            <p className="text-2xl font-bold text-gm-900">{stats.published}</p>
          </div>
        </div>

        {/* Investigations Table */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h2 className="text-xl font-semibold text-gm-900 mb-4">All Investigations</h2>
          <p className="text-gray-600">Admin dashboard is temporarily disabled. Please configure MongoDB to enable this feature.</p>
        </div>
      </div>
    </div>
  )
}