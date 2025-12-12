'use client';

import { useState, useEffect } from 'react';
import ScrollRevealWrapper from '@/components/ScrollRevealWrapper';

interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  source: string;
  date?: string;
  fileType?: string;
}

export default function GoogleSearchTab() {
  const [query, setQuery] = useState<string>('Ga Mawela documents');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);

  const performSearch = async (searchQuery: string, pageNum: number = 1) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/google-search?query=${encodeURIComponent(searchQuery)}&page=${pageNum}&limit=10`);

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();

      if (data.success === false && data.error) {
        console.warn('Search API returned error, using fallback data:', data.error);
      }

      setSearchResults(data.results || []);
      setTotalResults(data.totalResults || 0);
      setPage(pageNum);

    } catch (error) {
      console.error('Search error:', error);
      setError('Failed to perform search. Please try again.');
      // Use fallback data
      setSearchResults([
        {
          title: 'Ga-Mawela Land Claim Documentation',
          url: 'https://www.dlapsa.gov.za/land-claims/ga-mawela',
          snippet: 'Official government documentation of the Ga-Mawela land claim process and historical records.',
          source: 'Department of Land Affairs',
          date: '2023',
          fileType: 'pdf'
        },
        {
          title: 'Historical Records of Ga-Mawela Community',
          url: 'https://www.sahistory.org.za/ga-mawela',
          snippet: 'Comprehensive historical account of the Ga-Mawela community from colonial times to present.',
          source: 'South African History Online',
          date: '2022',
          fileType: 'html'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Perform initial search
    performSearch(query);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query, 1);
  };

  const handleDownloadDocument = async (url: string, title: string) => {
    try {
      // Send document to server for download and storage
      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filename: title,
          type: 'application/pdf', // Default type
          url: url,
          size: 0, // Will be calculated server-side
          description: `Document downloaded from ${url}`,
          category: 'historical',
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Document "${title}" has been downloaded and stored in our database!`);
        return result.document;
      } else {
        throw new Error('Failed to store document');
      }
    } catch (error) {
      console.error('Error downloading document:', error);
      alert(`Failed to download document: ${error instanceof Error ? error.message : 'Unknown error'}`);
      return null;
    }
  };

  return (
    <div className="w-full bg-metallic-blue-gradient-vertical relative py-16 px-6 md:px-12 bg-google-search-tab">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <ScrollRevealWrapper type="fadeUp" duration={0.8}>
          <h2 className="text-4xl md:text-5xl font-bold text-blue-lighter mb-2 font-merriweather">
            Ga Mawela Document Search
          </h2>
          <p className="text-lg md:text-xl text-white mb-12 font-inter">
            Search for historical, legal, and heritage documents related to Ga Mawela
          </p>
        </ScrollRevealWrapper>

        {/* Search Form */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.1}>
          <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-6 rounded-lg hover:bg-white/20 mb-8">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for Ga Mawela documents, history, legal records..."
                className="flex-grow px-4 py-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-yellow focus:ring-2 focus:ring-yellow"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-yellow text-black font-semibold hover:bg-yellow/90 transition-all inline-block font-inter rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg text-sm">
                {error}
              </div>
            )}
          </div>
        </ScrollRevealWrapper>

        {/* Search Results */}
        {loading && !searchResults.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-lg animate-pulse">
                <div className="h-6 bg-white/20 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-white/20 rounded w-1/2 mb-2"></div>
                <div className="space-y-1 mb-4">
                  <div className="h-3 bg-white/20 rounded"></div>
                  <div className="h-3 bg-white/20 rounded w-4/5"></div>
                  <div className="h-3 bg-white/20 rounded w-3/5"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-white/20 rounded w-20"></div>
                  <div className="h-6 bg-white/20 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6 mb-12">
            {searchResults.length > 0 ? (
              <>
                <div className="text-white/80 text-sm mb-4">
                  Found {totalResults} results for "{query}"
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.map((result, index) => (
                    <ScrollRevealWrapper key={index} type="fadeUp" duration={0.8} delay={index * 0.1}>
                      <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-6 hover:border-yellow/60 flex flex-col rounded-lg hover:bg-white/20">
                        <h3 className="text-lg font-bold text-yellow mb-2 font-merriweather">
                          <a href={result.url} target="_blank" rel="noopener noreferrer"
                             className="hover:underline hover:text-yellow/80 transition-colors">
                            {result.title}
                          </a>
                        </h3>

                        <p className="text-white/80 text-xs mb-2 font-inter">
                          Source: {result.source} {result.date ? ` | ${result.date}` : ''}
                        </p>

                        <p className="text-white text-sm mb-4 font-inter flex-grow">
                          {result.snippet}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                          <a
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/30 text-white text-xs font-semibold hover:bg-white/20 transition-all inline-block font-inter rounded"
                          >
                            Visit Source
                          </a>

                          <button
                            onClick={() => handleDownloadDocument(result.url, result.title)}
                            className="px-3 py-1 bg-yellow text-black text-xs font-semibold hover:bg-yellow/90 transition-all inline-block font-inter rounded"
                          >
                            Download & Store
                          </button>

                          {result.fileType && (
                            <span className="px-2 py-1 bg-white/10 backdrop-blur-md border border-white/30 text-white text-xs font-semibold rounded font-inter">
                              {result.fileType.toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                    </ScrollRevealWrapper>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-white/70">
                <p className="text-lg mb-4">No results found for "{query}"</p>
                <p className="text-sm">Try different search terms or check your spelling.</p>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {searchResults.length > 0 && (
          <ScrollRevealWrapper type="fadeUp" duration={0.8}>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => performSearch(query, Math.max(1, page - 1))}
                disabled={page <= 1 || loading}
                className="px-4 py-2 bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 transition-all rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="px-4 py-2 text-white">Page {page}</span>
              <button
                onClick={() => performSearch(query, page + 1)}
                disabled={searchResults.length < 10 || loading}
                className="px-4 py-2 bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-white/20 transition-all rounded disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </ScrollRevealWrapper>
        )}

        {/* Search Tips */}
        <ScrollRevealWrapper type="fadeUp" duration={0.8} delay={0.2}>
          <div className="card-interactive bg-white/15 backdrop-blur-md border border-white/30 p-6 rounded-lg hover:bg-white/20 mt-12">
            <h3 className="text-xl font-bold text-yellow mb-4 font-merriweather">Search Tips</h3>
            <ul className="text-white text-sm space-y-2 font-inter">
              <li className="flex items-start gap-2">
                <span className="text-yellow mt-1">•</span>
                <span>Try specific terms like "Ga Mawela land claim" or "Ga Mawela history"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow mt-1">•</span>
                <span>Search for document types: "Ga Mawela PDF" or "Ga Mawela legal documents"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow mt-1">•</span>
                <span>Use quotes for exact phrases: "Ga Mawela community"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow mt-1">•</span>
                <span>Search by source: "Ga Mawela site:gov.za" for government documents</span>
              </li>
            </ul>
          </div>
        </ScrollRevealWrapper>
      </div>
    </div>
  );
}