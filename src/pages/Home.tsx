import React, { useState } from 'react'
import SearchForm from '../components/SearchForm'
import FlightCard from '../components/FlightCard'
import FlightDetails from '../components/FlightDetails'
import { fetchFlights } from '../services/flightService'
import { useWatchlist } from '../context/WatchlistContext'

export default function Home() {
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<any | null>(null)
  const { toggle, watchlist } = useWatchlist()

  async function onSearch(params: { origin?: string; destination?: string; flightNumber?: string }) {
    setLoading(true)
    setError(null)
    setResults([])
    console.log('🔍 Search params:', params)
    try {
      const data = await fetchFlights()
      console.log('📦 Fetched data:', data)
      
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
      
      console.log(`✅ Filtered results: ${filtered.length} from ${data.flights.length}`)
      
      if (filtered.length === 0) {
        setError('No flights match your search criteria')
      } else {
        setResults(filtered)
      }
    } catch (err: any) {
      const errMsg = err?.message || 'Failed to fetch flights'
      console.error('❌ Error:', errMsg)
      setError(errMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Search Flights</h2>
        <SearchForm onSearch={onSearch} />
      </section>

      {/* Results Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Flight Results
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
                <div key={i} className="p-4 rounded-lg bg-gray-200 dark:bg-gray-700 h-48 animate-pulse"></div>
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
              <div className="text-4xl mb-2">✈️</div>
              <div className="text-gray-600 dark:text-gray-400">No flights found</div>
              <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">Try a different search or click "View All Flights"</div>
            </div>
          )}

          {/* Flight Results */}
          {!loading && results.length > 0 && (
            results.map((f) => (
              <FlightCard 
                key={f.id} 
                flight={f} 
                onSelect={(fl) => setSelected(fl)} 
                onToggleWatch={(fl) => toggle(fl)}
                isWatched={watchlist.some(w => w.id === f.id)}
              />
            ))
          )}
        </div>
      </section>

      {/* Details Section */}
      {selected && (
        <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Flight Details</h2>
            <button 
              onClick={() => setSelected(null)}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xl"
            >
              ✕
            </button>
          </div>
          <FlightDetails flight={selected} />
        </section>
      )}
    </div>
  )
}
