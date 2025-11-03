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
      
      if (params.flightNumber && params.flightNumber.trim()) {
        const airlineSearch = params.flightNumber.trim().toUpperCase()
        console.log('[SEARCH] Looking for airline:', airlineSearch)
        filtered = filtered.filter((f: any) => {
          // Extract airline code from flight number (first 2 letters usually)
          const flightNum = (f.flightNumber || f.flight_number || f.number || '')?.toString().toUpperCase() || ''
          const airlineCode = flightNum.substring(0, 2)
          const match = airlineCode === airlineSearch || flightNum.startsWith(airlineSearch)
          console.log('[DEBUG] Flight:', flightNum, '| Airline Code:', airlineCode, '| Search:', airlineSearch, '| Match:', match)
          return match
        })
        console.log('[SEARCH] After airline filter: found', filtered.length, 'flights')
        if (filtered.length > 0) {
          console.log('[SUCCESS] Matching flights:', filtered.map((f: any) => f.flightNumber))
        }
      }
      if (params.origin && params.origin.trim()) {
        const originCode = params.origin.trim().split(' ')[0].toUpperCase()
        filtered = filtered.filter((f: any) => f.origin?.code?.toUpperCase() === originCode)
      }
      if (params.destination && params.destination.trim()) {
        const destCode = params.destination.trim().split(' ')[0].toUpperCase()
        filtered = filtered.filter((f: any) => f.destination?.code?.toUpperCase() === destCode)
      }
      
      console.log(`[RESULTS] Filtered results: ${filtered.length} from ${data.flights.length}`)
      
      if (filtered.length === 0) {
        // Provide more helpful error message
        const searchTerms = []
        if (params.flightNumber) searchTerms.push(`flight ${params.flightNumber}`)
        if (params.origin) searchTerms.push(`from ${params.origin.split(' ')[0]}`)
        if (params.destination) searchTerms.push(`to ${params.destination.split(' ')[0]}`)
        
        setError(`No flights found matching: ${searchTerms.join(', ')}. Try searching with different criteria.`)
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
    <div className="space-y-4">
      {/* Search Section with better styling */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-900 p-6 rounded-xl shadow-lg border-0">
        <h2 className="text-2xl font-bold text-white mb-4">Find Your Flight</h2>
        <SearchForm onSearch={onSearch} />
      </section>

      {/* Results Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Left: Flight List */}
        <div className="lg:col-span-3">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Available Flights
                {!loading && results.length > 0 && (
                  <span className="ml-3 text-lg font-normal text-blue-600">({results.length})</span>
                )}
              </h2>
            </div>

            <div className="space-y-2">
              {/* Loading State */}
              {loading && (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700 h-24 animate-pulse"></div>
                  ))}
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className="p-3 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg">
                  <div className="text-red-800 dark:text-red-200 font-semibold text-xs">Error</div>
                  <div className="text-red-700 dark:text-red-300 text-xs">{error}</div>
                </div>
              )}

              {/* Empty State */}
              {!loading && !error && results.length === 0 && (
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-center">
                  <div className="text-gray-600 dark:text-gray-400 text-xs">No flights found</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Try a different search or click "View All Flights"</div>
                </div>
              )}

              {/* Flight Results */}
              {!loading && paginatedResults.length > 0 && (
                <>
                  <div className="space-y-2">
                    {paginatedResults.map((f) => (
                      <div
                        key={f.id}
                        onClick={() => setSelected(f)}
                        className={`cursor-pointer transition-all ${
                          selected?.id === f.id
                            ? 'ring-2 ring-blue-500 scale-100'
                            : 'hover:scale-101'
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
                    <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Prev
                      </button>
                      
                      <div className="flex gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => goToPage(page)}
                            className={`w-7 h-7 text-xs rounded transition-colors ${
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
                        className="px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {/* Page Info */}
                  <div className="text-center text-xs text-gray-600 dark:text-gray-400 mt-2">
                    Page {currentPage}/{totalPages} • {paginatedResults.length}/{results.length}
                  </div>
                </>
              )}
            </div>
          </section>
        </div>

        {/* Right: Flight Details Panel */}
        <div className="lg:col-span-2">
          {selected ? (
            <section className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 sticky top-0 max-h-screen overflow-y-auto">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">Flight Details</h3>
                <button 
                  onClick={() => setSelected(null)}
                  className="flex-shrink-0 px-2 py-0.5 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="text-sm">
                <FlightDetails flight={selected} />
              </div>
            </section>
          ) : (
            <div className="bg-blue-50 dark:bg-gray-800 p-4 rounded-xl border-2 border-dashed border-blue-300 dark:border-gray-600 text-center h-28 flex items-center justify-center">
              <div>
                <div className="text-3xl text-blue-400 mb-2">✈️</div>
                <div className="text-sm text-gray-700 dark:text-gray-300 font-semibold">Select a flight to view details</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
