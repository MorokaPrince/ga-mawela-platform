'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';

interface EvidenceExportButtonProps {
  investigationId: string;
  type: 'slp' | 'paia' | 'deeds';
  className?: string;
}

export default function EvidenceExportButton({ investigationId, type, className = '' }: EvidenceExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const response = await fetch(`/api/export/${type}?investigationId=${investigationId}`);
      if (!response.ok) {
        throw new Error('Export failed');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${type}-request-${investigationId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export document. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const getButtonText = () => {
    switch (type) {
      case 'slp':
        return 'Export SLP Request';
      case 'paia':
        return 'Export PAIA Request';
      case 'deeds':
        return 'Export Deeds Office Form';
      default:
        return 'Export Document';
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className={`inline-flex items-center px-4 py-2 bg-gm-600 text-white rounded-lg hover:bg-gm-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 ${className}`}
    >
      <Download className="w-4 h-4 mr-2" />
      {isExporting ? 'Exporting...' : getButtonText()}
    </button>
  );
}