import React from 'react'
import { FaHeart } from 'react-icons/fa'
import { useWatchlist } from '../context/WatchlistContext'
import FlightCard from '../components/FlightCard'

export default function WatchlistPage() {
  const { watchlist, toggle } = useWatchlist()

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <FaHeart className="text-red-500" size={32} />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Your Watchlist</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Keep track of flights you want to monitor</p>
          </div>
        </div>
      </section>

      {/* Watchlist Content */}
      <section className="space-y-4">
        {/* Empty State */}
        {watchlist.length === 0 && (
          <div className="p-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 text-center">
            <div className="text-6xl mb-4">💖</div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Your watchlist is empty</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Start by searching for flights and adding them to your watchlist</p>
          </div>
        )}

        {/* Watchlist Stats */}
        {watchlist.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              [STATS] <span className="font-semibold">{watchlist.length} flight{watchlist.length !== 1 ? 's' : ''}</span> in your watchlist
            </div>
          </div>
        )}

        {/* Flight Cards */}
        {watchlist.map((f) => (
          <FlightCard 
            key={f.id} 
            flight={f} 
            onToggleWatch={() => toggle(f)} 
            isWatched={true}
          />
        ))}
      </section>
    </div>
  )
}
