import React, { useState } from 'react'
import SearchForm from '../components/SearchForm'
import FlightCard from '../components/FlightCard'
import FlightDetails from '../components/FlightDetails'
import { fetchFlights } from '../services/flightService'
import { useWatchlist } from '../context/WatchlistContext'

const ITEMS_PER_PAGE = 10

export default function Home() {
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<any | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const { toggle, watchlist } = useWatchlist()

  async function onSearch(params: { origin?: string; destination?: string; flightNumber?: string }) {
    setLoading(true)
    setError(null)
    setResults([])
    setCurrentPage(1)
    setSelected(null)
    console.log('[SEARCH] Search params:', params)
    try {
      const data = await fetchFlights()
      console.log('[API] Fetched data:', data)
      
      if (!data || !data.flights || data.flights.length === 0) {
        setError('No flights available')
        return
      }
      
      // simple client-side filter - show all flights if no search params
      let filtered = data.flights
      
      if (params.flightNumber) {
        filtered = filtered.filter((f: any) => f.flightNumber?.toLowerCase()?.includes(params.flightNumber!.toLowerCase()))
      }
      if (params.origin) {
        filtered = filtered.filter((f: any) => f.origin?.code?.toLowerCase() === params.origin!.toLowerCase())
      }
      if (params.destination) {
        filtered = filtered.filter((f: any) => f.destination?.code?.toLowerCase() === params.destination!.toLowerCase())
      }
      
      console.log(`[RESULTS] Filtered results: ${filtered.length} from ${data.flights.length}`)
      
      if (filtered.length === 0) {
        setError('No flights match your search criteria')
      } else {
        setResults(filtered)
      }
    } catch (err: any) {
      const errMsg = err?.message || 'Failed to fetch flights'
      console.error('[ERROR]:', errMsg)
      setError(errMsg)
    } finally {
      setLoading(false)
    }
  }

  // Pagination logic
  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedResults = results.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    setSelected(null)
  }

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Search Flights</h2>
        <SearchForm onSearch={onSearch} />
      </section>

      {/* Results and Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left: Flight List */}
        <div className="lg:col-span-3">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Flights
                {!loading && results.length > 0 && (
                  <span className="ml-2 text-lg font-normal text-blue-600">({results.length})</span>
                )}
              </h2>
            </div>

            <div className="space-y-4">
              {/* Loading State */}
              {loading && (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-4 rounded-lg bg-gray-200 dark:bg-gray-700 h-32 animate-pulse"></div>
                  ))}
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="p-4 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
                  <div className="text-red-800 dark:text-red-200 font-semibold">Error</div>
                  <div className="text-red-700 dark:text-red-300 text-sm">{error}</div>
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && results.length === 0 && (
                <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-center">
                  <div className="text-gray-600 dark:text-gray-400">No flights found</div>
                  <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">Try a different search or click "View All Flights"</div>
                </div>
              )}

              {/* Flight Results */}
              {!loading && paginatedResults.length > 0 && (
                <>
                  <div className="space-y-3">
                    {paginatedResults.map((f) => (
                      <div
                        key={f.id}
                        onClick={() => setSelected(f)}
                        className={`cursor-pointer transition-all ${
                          selected?.id === f.id
                            ? 'ring-2 ring-blue-500 scale-105'
                            : 'hover:scale-102'
                        }`}
                      >
                        <FlightCard 
                          flight={f} 
                          onSelect={(fl) => setSelected(fl)} 
                          onToggleWatch={(fl) => toggle(fl)}
                          isWatched={watchlist.some(w => w.id === f.id)}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Previous
                      </button>
                      
                      <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`w-8 h-8 text-sm rounded transition-colors ${
                              currentPage === page
                                ? 'bg-blue-600 text-white'
                                : 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {/* Page Info */}
                  <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-3">
                    Page {currentPage} of {totalPages} | Showing {paginatedResults.length} of {results.length} flights
                  </div>
                </>
              )}
            </div>
          </section>
        </div>

        {/* Right: Flight Details - Compact Sidebar */}
        <div className="lg:col-span-1">
          {selected ? (
            <section className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 sticky top-0 max-h-screen overflow-y-auto">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">Details</h3>
                <button 
                  onClick={() => setSelected(null)}
                  className="flex-shrink-0 px-2 py-1 text-xs text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Close
                </button>
              </div>
              <div className="text-sm">
                <FlightDetails flight={selected} />
              </div>
            </section>
          ) : (
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-center">
              <div className="text-2xl mb-2 text-gray-400">📋</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Select a flight</div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Click any flight to view details</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
