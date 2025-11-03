import React, { useState } from 'react'
import SearchForm from '../components/SearchForm'
import FlightCard from '../components/FlightCard'
import FlightDetails from '../components/FlightDetails'
import { fetchFlights } from '../services/flightService'
import { useWatchlist } from '../context/WatchlistContext'

const ITEMS_PER_PAGE = 10

interface HomeProps {
  isDark?: boolean
}

export default function Home({ isDark = false }: HomeProps) {
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<any | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasSearched, setHasSearched] = useState(false)
  const { toggle, watchlist } = useWatchlist()

  async function onSearch(params: { origin?: string; destination?: string; flightNumber?: string }) {
    setLoading(true)
    setError(null)
    setResults([])
    setCurrentPage(1)
    setSelected(null)
    setHasSearched(true)
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
      <section className={`p-6 rounded-xl shadow-lg border-0 ${isDark 
        ? 'bg-gradient-to-r from-[#505081] to-[#272757]' 
        : 'bg-gradient-to-br from-[#6A89A7]/70 to-[#88BDF2]/60 shadow-xl'
      }`}>
        <h2 className={`text-2xl font-bold ${isDark ? 'text-[#88BDF2]' : 'text-white drop-shadow'} mb-4`}>Find Your Flight</h2>
        <SearchForm onSearch={onSearch} isDark={isDark} />
      </section>

      {/* Results Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Left: Flight List */}
        <div className="lg:col-span-3">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-2xl font-bold ${isDark ? 'text-[#E8E8F0]' : 'text-[#384959]'}`}>
                Available Flights
                {!loading && results.length > 0 && (
                  <span className={`ml-3 text-lg font-normal ${isDark ? 'text-[#88BDF2]' : 'text-[#6A89A7]'}`}>({results.length})</span>
                )}
              </h2>
            </div>

            <div className="space-y-2">
              {/* Loading State */}
              {loading && (
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`p-3 rounded-lg ${isDark ? 'bg-[#505081]' : 'bg-gradient-to-r from-[#BDDFC]/40 to-[#88BDF2]/30'} h-24 animate-pulse`}></div>
                  ))}
                </div>
              )}

              {/* Error State */}
              {error && !loading && (
                <div className={`p-3 border rounded-lg ${isDark ? 'bg-[#3E2D5C] border-[#505081]' : 'bg-[#BDDFC]/20 border-[#6A89A7]/40'}`}>
                  <div className={`font-semibold text-xs ${isDark ? 'text-[#88BDF2]' : 'text-[#6A89A7]'}`}>Error</div>
                  <div className={`text-xs ${isDark ? 'text-[#BDDFC]' : 'text-[#384959]'}`}>{error}</div>
                </div>
              )}

              {/* Initial State - Before Any Search */}
              {!loading && !error && !hasSearched && results.length === 0 && (
                <div className={`p-8 rounded-lg border-2 border-dashed ${isDark ? 'bg-[#1A1A2E] border-[#505081]' : 'bg-gradient-to-r from-[#BDDFC]/20 to-[#88BDF2]/15 border-[#BDDFC]/50'} text-center`}>
                  <div className={`text-4xl mb-3 ${isDark ? 'text-[#505081]' : 'text-[#BDDFC]/40'}`}>✈️</div>
                  <div className={`text-sm font-semibold ${isDark ? 'text-[#E8E8F0]' : 'text-[#384959]'}`}>Start Your Flight Search</div>
                  <div className={`text-xs mt-2 ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>Enter your departure airport, arrival airport, or airline code above to find flights</div>
                </div>
              )}

              {/* Empty Search Result State - After Search but No Results */}
              {!loading && hasSearched && results.length === 0 && !error && (
                <div className={`p-8 rounded-lg border-2 border-dashed ${isDark ? 'bg-[#3E2D5C] border-[#505081]' : 'bg-red-50 border-red-300'} text-center`}>
                  <div className={`text-2xl mb-3 ${isDark ? 'text-[#88BDF2]' : 'text-red-400'}`}>✗</div>
                  <div className={`text-sm font-semibold ${isDark ? 'text-[#BDDFC]' : 'text-red-700'}`}>No Flights Found</div>
                  <div className={`text-xs mt-2 ${isDark ? 'text-[#8686AC]' : 'text-red-600'}`}>Try searching with different criteria or check the spelling</div>
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
                            ? isDark ? 'ring-2 ring-[#88BDF2] scale-100' : 'ring-2 ring-blue-500 scale-100'
                            : 'hover:scale-101'
                        }`}
                      >
                        <FlightCard 
                          flight={f} 
                          onSelect={(fl) => setSelected(fl)} 
                          onToggleWatch={(fl) => toggle(fl)}
                          isWatched={watchlist.some(w => w.id === f.id)}
                          isDark={isDark}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className={`flex items-center justify-center gap-2 mt-3 pt-3 border-t ${isDark ? 'border-[#505081]' : 'border-[#BDDFC]/40'}`}>
                      <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-2 py-1 text-xs rounded border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isDark 
                          ? 'border-[#505081] text-[#8686AC] hover:bg-[#272757]' 
                          : 'border-[#BDDFC]/60 text-[#6A89A7] hover:bg-[#BDDFC]/40 hover:border-[#88BDF2]'
                        }`}
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
                                ? isDark ? 'bg-[#505081] text-[#E8E8F0]' : 'bg-gradient-to-r from-[#6A89A7] to-[#88BDF2] text-white'
                                : isDark ? 'border border-[#505081] text-[#8686AC] hover:bg-[#272757]' : 'border border-[#BDDFC]/60 text-[#6A89A7] hover:bg-[#BDDFC]/40'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-2 py-1 text-xs rounded border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isDark 
                          ? 'border-[#505081] text-[#8686AC] hover:bg-[#272757]' 
                          : 'border-[#BDDFC]/60 text-[#6A89A7] hover:bg-[#BDDFC]/40 hover:border-[#88BDF2]'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  )}

                  {/* Page Info */}
                  <div className={`text-center text-xs mt-2 ${isDark ? 'text-[#8686AC]' : 'text-[#88BDF2]/70'}`}>
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
            <section className={`p-4 rounded-xl shadow-md border ${isDark 
              ? 'bg-[#272757] border-[#505081]' 
              : 'bg-white/80 backdrop-blur-sm border-[#BDDFC]/50 shadow-lg'
            } sticky top-0 max-h-screen overflow-y-auto`}>
              <div className={`flex items-center justify-between mb-3 pb-3 border-b ${isDark ? 'border-[#505081]' : 'border-[#BDDFC]/40'}`}>
                <h3 className={`text-lg font-bold truncate ${isDark ? 'text-[#E8E8F0]' : 'text-[#384959]'}`}>Flight Details</h3>
                <button 
                  onClick={() => setSelected(null)}
                  className={`flex-shrink-0 px-2 py-0.5 text-sm rounded transition-colors ${isDark 
                    ? 'text-[#8686AC] hover:text-[#88BDF2] bg-[#1A1A2E] hover:bg-[#505081]' 
                    : 'text-[#6A89A7] hover:text-[#384959] bg-[#BDDFC]/40 hover:bg-[#BDDFC]/60 border border-[#BDDFC]/50'
                  }`}
                >
                  ✕
                </button>
              </div>
              <div className="text-sm">
                <FlightDetails flight={selected} isDark={isDark} />
              </div>
            </section>
          ) : (
            <div className={`p-4 rounded-xl border-2 border-dashed text-center h-28 flex items-center justify-center ${isDark 
              ? 'bg-[#1A1A2E] border-[#505081]' 
              : 'bg-gradient-to-br from-[#BDDFC]/30 to-[#88BDF2]/20 border-[#BDDFC]/50'
            }`}>
              <div>
                <div className={`text-3xl mb-2 ${isDark ? 'text-[#88BDF2]' : 'text-[#88BDF2]'}`}>✈️</div>
                <div className={`text-sm font-semibold ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>Select a flight to view details</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
