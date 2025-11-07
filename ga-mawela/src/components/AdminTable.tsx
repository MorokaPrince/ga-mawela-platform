'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Investigation {
  _id: string
  title: string
  description: string
  status: 'draft' | 'pending' | 'approved' | 'published'
  createdAt: string
  updatedAt: string
  signoffAt?: string
}

interface AdminTableProps {
  investigations: Investigation[]
}

export default function AdminTable({ investigations }: AdminTableProps) {
  const [filter, setFilter] = useState<string>('all')

  const filteredInvestigations = investigations.filter(inv => {
    if (filter === 'all') return true
    return inv.status === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-neutral-100 text-neutral-800'
      case 'pending': return 'bg-accent-100 text-accent-800'
      case 'approved': return 'bg-gm-100 text-gm-800'
      case 'published': return 'bg-green-100 text-green-800'
      default: return 'bg-neutral-100 text-neutral-800'
    }
  }

  return (
    <div className="space-y-4">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter investigations by status">
        {['all', 'draft', 'pending', 'approved', 'published'].map(status => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            aria-pressed={filter === status}
            aria-describedby={`filter-${status}-desc`}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors focus:outline-none focus:ring-2 focus:ring-gm-500 focus:ring-offset-2 ${
              filter === status
                ? 'bg-gm-500 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            {status}
          </button>
        ))}
        <div id="filter-all-desc" className="sr-only">Show all investigations</div>
        <div id="filter-draft-desc" className="sr-only">Show draft investigations</div>
        <div id="filter-pending-desc" className="sr-only">Show pending investigations</div>
        <div id="filter-approved-desc" className="sr-only">Show approved investigations</div>
        <div id="filter-published-desc" className="sr-only">Show published investigations</div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200" role="table" aria-label="Investigations management table">
          <thead className="bg-neutral-50">
            <tr role="row">
              <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Created
              </th>
              <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Signed Off
              </th>
              <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200" role="rowgroup">
            {filteredInvestigations.map((inv) => (
              <tr key={inv._id} className="hover:bg-neutral-50" role="row">
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gm-900">{inv.title}</div>
                  <div className="text-sm text-neutral-500 truncate max-w-xs" title={inv.description}>
                    {inv.description}
                  </div>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize ${getStatusColor(inv.status)}`} role="status" aria-label={`Status: ${inv.status}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                  <time dateTime={inv.createdAt}>{new Date(inv.createdAt).toLocaleDateString()}</time>
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                  {inv.signoffAt ? <time dateTime={inv.signoffAt}>{new Date(inv.signoffAt).toLocaleDateString()}</time> : 'Not signed'}
                </td>
                <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    href={`/admin/investigations/${inv._id}`}
                    className="text-gm-600 hover:text-gm-700 focus:text-gm-700 focus:outline-none focus:ring-2 focus:ring-gm-500 focus:ring-offset-2 rounded px-2 py-1"
                    aria-describedby={`view-${inv._id}-desc`}
                  >
                    View Details
                  </Link>
                  <span id={`view-${inv._id}-desc`} className="sr-only">View details for investigation: {inv.title}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredInvestigations.length === 0 && (
        <div className="text-center py-8 text-neutral-500">
          No investigations found with the selected filter.
        </div>
      )}
    </div>
  )
}