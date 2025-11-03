import React, { useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { useWatchlist } from '../context/WatchlistContext'
import FlightCard from '../components/FlightCard'
import FlightDetails from '../components/FlightDetails'
import { Flight } from '../context/WatchlistContext'

interface WatchlistPageProps {
  isDark?: boolean
}

export default function WatchlistPage({ isDark = false }: WatchlistPageProps) {
  const { watchlist, toggle } = useWatchlist()
  const [selected, setSelected] = useState<Flight | null>(null)

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <FaHeart className={isDark ? 'text-[#88BDF2]' : 'text-[#6A89A7]'} size={32} />
          <div>
            <h1 className={`text-3xl font-bold ${isDark ? 'text-[#E8E8F0]' : 'text-[#384959]'}`}>Your Watchlist</h1>
            <p className={`text-sm ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>Keep track of flights you want to monitor</p>
          </div>
        </div>
      </section>

      {/* Watchlist Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Left: Flight List */}
        <div className="lg:col-span-3">
          <section className="space-y-4">
            {/* Empty State */}
            {watchlist.length === 0 && (
              <div className={`p-12 rounded-lg border-2 border-dashed text-center ${
                isDark
                  ? 'bg-[#1A1A2E] border-[#505081]'
                  : 'bg-gradient-to-br from-[#BDDFC]/20 to-[#88BDF2]/15 border-[#BDDFC]/50'
              }`}>
                <div className={`text-6xl mb-4 ${isDark ? 'text-[#88BDF2]' : 'text-[#88BDF2]'}`}>💖</div>
                <h3 className={`text-lg font-semibold mb-2 ${isDark ? 'text-[#E8E8F0]' : 'text-[#6A89A7]'}`}>Your watchlist is empty</h3>
                <p className={`text-sm ${isDark ? 'text-[#8686AC]' : 'text-[#88BDF2]/70'}`}>Start by searching for flights and adding them to your watchlist</p>
              </div>
            )}

            {/* Watchlist Stats */}
            {watchlist.length > 0 && (
              <div className={`p-4 rounded-lg border ${isDark ? 'bg-[#272757] border-[#505081]' : 'bg-white/80 backdrop-blur-sm border-[#BDDFC]/50'}`}>
                <div className={`text-sm ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>
                  [STATS] <span className="font-semibold">{watchlist.length} flight{watchlist.length !== 1 ? 's' : ''}</span> in your watchlist
                </div>
              </div>
            )}

            {/* Flight Cards */}
            <div className="space-y-2">
              {watchlist.map((f) => (
                <div
                  key={f.id}
                  onClick={() => setSelected(f)}
                  className={`cursor-pointer transition-all ${
                    selected?.id === f.id
                      ? isDark ? 'ring-2 ring-[#88BDF2] scale-100' : 'ring-2 ring-[#6A89A7] scale-100'
                      : 'hover:scale-101'
                  }`}
                >
                  <FlightCard 
                    flight={f} 
                    onSelect={(fl) => setSelected(fl)}
                    onToggleWatch={() => toggle(f)} 
                    isWatched={true}
                    isDark={isDark}
                  />
                </div>
              ))}
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
