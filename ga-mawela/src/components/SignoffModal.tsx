'use client'

import { useState } from 'react'

interface Investigation {
  _id: string
  title: string
  description: string
  status: 'draft' | 'pending' | 'approved' | 'published'
  createdAt: string
  updatedAt: string
  signoffAt?: string
  evidence?: string[]
}

interface SignoffModalProps {
  investigation: Investigation
  isOpen: boolean
  onClose: () => void
  onSignoff: (investigationId: string) => void
}

export default function SignoffModal({ investigation, isOpen, onClose, onSignoff }: SignoffModalProps) {
  const [isConfirming, setIsConfirming] = useState(false)

  if (!isOpen) return null

  const handleSignoff = async () => {
    setIsConfirming(true)
    try {
      await onSignoff(investigation._id)
      onClose()
    } catch (error) {
      console.error('Signoff failed:', error)
    } finally {
      setIsConfirming(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signoff-modal-title"
      aria-describedby="signoff-modal-description"
    >
      <div className="bg-white rounded-xl p-4 sm:p-6 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h2 id="signoff-modal-title" className="text-xl font-semibold text-gm-900 mb-4">Legal Signoff</h2>

        <div className="mb-6" id="signoff-modal-description">
          <h3 className="font-medium text-gm-800 mb-2">{investigation.title}</h3>
          <p className="text-sm text-neutral-600 mb-4">{investigation.description}</p>

          <div className="bg-neutral-50 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-gm-700 mb-2">Evidence Review:</h4>
            <ul className="text-sm text-neutral-600 space-y-1" role="list" aria-label="Investigation evidence">
              {investigation.evidence && investigation.evidence.map((evidence, index) => (
                <li key={index} className="flex items-center" role="listitem">
                  <span className="w-2 h-2 bg-gm-400 rounded-full mr-2" aria-hidden="true"></span>
                  {evidence}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4" role="alert">
            <p className="text-sm text-yellow-800">
              <strong>Legal Review Required:</strong> By signing off, you confirm that all evidence has been reviewed,
              legal compliance has been verified, and this investigation is ready for approval.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 focus:bg-neutral-50 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2"
            disabled={isConfirming}
            aria-describedby="cancel-button-desc"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSignoff}
            disabled={isConfirming}
            className="flex-1 px-4 py-2 bg-gm-500 text-white rounded-lg hover:bg-gm-600 focus:bg-gm-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gm-500 focus:ring-offset-2"
            aria-describedby="signoff-button-desc"
          >
            {isConfirming ? 'Signing Off...' : 'Sign Off & Approve'}
          </button>
        </div>
        <div id="cancel-button-desc" className="sr-only">Cancel the signoff process and close this modal</div>
        <div id="signoff-button-desc" className="sr-only">Confirm legal signoff and approve the investigation</div>
      </div>
    </div>
  )
}