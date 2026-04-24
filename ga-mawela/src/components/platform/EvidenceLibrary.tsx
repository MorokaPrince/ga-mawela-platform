"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Download, ExternalLink, FileText, Eye } from "lucide-react";
import type { EvidenceDocument, LibraryDocument } from "@/data/platformData";
import { libraryCategories } from "@/data/platformData";

interface EvidenceLibraryProps {
  documents: EvidenceDocument[];
  onViewDocument: (doc: EvidenceDocument) => void;
  onDownloadDocument: (doc: EvidenceDocument) => void;
}

export function EvidenceLibrary({
  documents,
  onViewDocument,
  onDownloadDocument,
}: EvidenceLibraryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedRelevance, setSelectedRelevance] = useState<string>("All");
  const [selectedFarm, setSelectedFarm] = useState<string>("All");

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchesSearch = searchQuery === "" || 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
      const matchesRelevance = selectedRelevance === "All" || doc.legalRelevance === selectedRelevance;
      const matchesFarm = selectedFarm === "All" || doc.farmIds.includes(selectedFarm);
      return matchesSearch && matchesCategory && matchesRelevance && matchesFarm;
    });
  }, [documents, searchQuery, selectedCategory, selectedRelevance, selectedFarm]);

  const uniqueFarms = useMemo(() => {
    const farms = new Set<string>();
    documents.forEach((doc) => doc.farmIds.forEach((id) => farms.add(id)));
    return Array.from(farms);
  }, [documents]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "SG Diagram": "bg-amber-500/20 text-amber-400 border-amber-500/30",
      "Title Deed": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      "Mining Right": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "SLP": "bg-purple-500/20 text-purple-400 border-purple-500/30",
      "EIA": "bg-orange-500/20 text-orange-400 border-orange-500/30",
      "Oral Testimony": "bg-rose-500/20 text-rose-400 border-rose-500/30",
      "Legal Opinion": "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
      "Other": "bg-slate-500/20 text-slate-400 border-slate-500/30",
    };
    return colors[category] || "bg-slate-500/20 text-slate-400 border-slate-500/30";
  };

  const getRelevanceColor = (relevance: string) => {
    switch (relevance) {
      case "High": return "text-red-400";
      case "Medium": return "text-amber-400";
      case "Low": return "text-slate-400";
      default: return "text-slate-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[var(--gm-foreground)]">
            Evidence Library
          </h2>
          <p className="text-sm text-[var(--gm-muted)]">
            {documents.length} documents categorized for legal and community reference
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--gm-muted)]" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="gm-input pl-10 w-full"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="gm-input w-full sm:w-auto"
        >
          <option value="All">All Categories</option>
          {libraryCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={selectedRelevance}
          onChange={(e) => setSelectedRelevance(e.target.value)}
          className="gm-input w-full sm:w-auto"
        >
          <option value="All">All Relevance</option>
          <option value="High">High Relevance</option>
          <option value="Medium">Medium Relevance</option>
          <option value="Low">Low Relevance</option>
        </select>
        <select
          value={selectedFarm}
          onChange={(e) => setSelectedFarm(e.target.value)}
          className="gm-input w-full sm:w-auto"
        >
          <option value="All">All Farms</option>
          {uniqueFarms.map((farmId) => (
            <option key={farmId} value={farmId}>{farmId}</option>
          ))}
        </select>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="gm-row">
          <p className="text-xs uppercase tracking-wider text-[var(--gm-muted)]">Total Documents</p>
          <p className="text-2xl font-bold text-[var(--gm-primary)]">{documents.length}</p>
        </div>
        <div className="gm-row">
          <p className="text-xs uppercase tracking-wider text-[var(--gm-muted)]">High Relevance</p>
          <p className="text-2xl font-bold text-red-400">
            {documents.filter((d) => d.legalRelevance === "High").length}
          </p>
        </div>
        <div className="gm-row">
          <p className="text-xs uppercase tracking-wider text-[var(--gm-muted)]">SG Diagrams</p>
          <p className="text-2xl font-bold text-amber-400">
            {documents.filter((d) => d.category === "SG Diagram").length}
          </p>
        </div>
        <div className="gm-row">
          <p className="text-xs uppercase tracking-wider text-[var(--gm-muted)]">Mining Rights</p>
          <p className="text-2xl font-bold text-blue-400">
            {documents.filter((d) => d.category === "Mining Right").length}
          </p>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.map((doc) => (
          <div
            key={doc.id}
            className="gm-row flex flex-col"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[var(--gm-primary)]" />
                <span className="font-medium text-[var(--gm-foreground)]">{doc.title}</span>
              </div>
              <span className={`gm-badge ${getCategoryColor(doc.category)}`}>
                {doc.category}
              </span>
            </div>

            <p className="mt-2 text-sm text-[var(--gm-muted)]">{doc.description}</p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className={`text-xs ${getRelevanceColor(doc.legalRelevance)}`}>
                {doc.legalRelevance} Relevance
              </span>
              {doc.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[var(--gm-primary)]/10 px-2 py-0.5 text-xs text-[var(--gm-primary)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between gap-2">
              <span className="text-xs text-[var(--gm-muted)]">{doc.date}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => onViewDocument(doc)}
                  className="gm-btn-secondary flex items-center gap-1"
                >
                  <Eye className="h-4 w-4" />
                  View
                </button>
                <button
                  onClick={() => onDownloadDocument(doc)}
                  className="gm-btn-primary flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="gm-row text-center">
          <p className="text-[var(--gm-muted)]">No documents match your filters.</p>
        </div>
      )}
    </div>
  );
}