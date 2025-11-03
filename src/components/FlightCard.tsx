import React from 'react'
import { Flight } from '../context/WatchlistContext'
import { FaPlane, FaClock, FaCheckCircle, FaExclamationCircle, FaTimesCircle, FaHeart, FaRegHeart } from 'react-icons/fa'

type Props = {
  flight: Flight
  onSelect?: (f: Flight) => void
  onToggleWatch?: (f: Flight) => void
  isWatched?: boolean
  isDark?: boolean
}

function statusConfig(s?: string) {
  if (!s) return { color: 'bg-gray-100 text-gray-800', icon: FaClock, label: 'Unknown' }
  const lower = s.toLowerCase()
  if (lower.includes('cancel')) return { color: 'bg-red-100 text-red-800', icon: FaTimesCircle, label: 'Cancelled' }
  if (lower.includes('delay')) return { color: 'bg-yellow-100 text-yellow-800', icon: FaExclamationCircle, label: 'Delayed' }
  return { color: 'bg-green-100 text-green-800', icon: FaCheckCircle, label: 'On Time' }
}

export default function FlightCard({ flight, onSelect, onToggleWatch, isWatched, isDark = false }: Props) {
  const status = statusConfig(flight.status)
  const StatusIcon = status.icon

  const formatTime = (isoString?: string) => {
    if (!isoString) return '—'
    const date = new Date(isoString)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  }

  return (
    <div className={`flight-card animate-fade-in p-3 rounded-lg shadow-md border transition-all ${
      isDark 
        ? 'bg-[#272757] border-[#505081] hover:border-[#88BDF2]' 
        : 'bg-white/80 backdrop-blur-sm border-[#BDDFC]/50 hover:border-[#88BDF2]/80 shadow-md hover:shadow-lg'
    }`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2 flex-1">
          <FaPlane className={`text-lg ${isDark ? 'text-[#88BDF2]' : 'text-[#6A89A7]'}`} />
          <div>
            <div className={`font-bold text-base ${isDark ? 'text-[#E8E8F0]' : 'text-[#384959]'}`}>{flight.flightNumber}</div>
            <div className={`text-xs ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>{flight.airline}</div>
          </div>
        </div>
        <div className={`px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 ${status.color}`}>
          <StatusIcon size={12} />
          {status.label}
        </div>
      </div>

      <div className={`grid grid-cols-3 gap-2 mb-2 pb-2 border-b ${isDark ? 'border-[#505081]' : 'border-[#BDDFC]/40'}`}>
        {/* From */}
        <div>
          <div className={`text-xs uppercase font-semibold ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>From</div>
          <div className={`font-bold text-base ${isDark ? 'text-[#E8E8F0]' : 'text-[#384959]'}`}>{flight.origin?.code || '—'}</div>
          <div className={`text-xs ${isDark ? 'text-[#8686AC]' : 'text-[#88BDF2]/70'}`}>{flight.origin?.city || ''}</div>
        </div>

        {/* Arrow & Duration */}
        <div className="flex flex-col items-center justify-center">
          <FaPlane className={`rotate-90 mb-0.5 text-sm ${isDark ? 'text-[#505081]' : 'text-[#BDDFC]/60'}`} />
          <div className={`text-xs ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>{flight.duration || '—'}</div>
        </div>

        {/* To */}
        <div>
          <div className={`text-xs uppercase font-semibold ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>To</div>
          <div className={`font-bold text-base ${isDark ? 'text-[#E8E8F0]' : 'text-[#384959]'}`}>{flight.destination?.code || '—'}</div>
          <div className={`text-xs ${isDark ? 'text-[#8686AC]' : 'text-[#88BDF2]/70'}`}>{flight.destination?.city || ''}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
        <div>
          <div className={`text-xs uppercase font-semibold ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>Departure</div>
          <div className={`font-semibold ${isDark ? 'text-[#E8E8F0]' : 'text-[#384959]'}`}>{formatTime(flight.departure?.scheduled)}</div>
          {flight.departure?.actual && (
            <div className={`text-xs ${isDark ? 'text-[#8686AC]' : 'text-[#88BDF2]/70'}`}>Actual: {formatTime(flight.departure.actual)}</div>
          )}
        </div>
        <div>
          <div className={`text-xs uppercase font-semibold ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>Arrival</div>
          <div className={`font-semibold ${isDark ? 'text-[#E8E8F0]' : 'text-[#384959]'}`}>{formatTime(flight.arrival?.scheduled)}</div>
          {flight.arrival?.estimated && (
            <div className={`text-xs ${isDark ? 'text-[#8686AC]' : 'text-[#88BDF2]/70'}`}>Est: {formatTime(flight.arrival.estimated)}</div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onSelect?.(flight)}
          className={`flex-1 px-2 py-1 rounded border text-xs font-semibold transition-all duration-200 ${
            isDark
              ? 'border-[#505081] text-[#88BDF2] hover:bg-[#505081]/40 hover:shadow-md hover:shadow-[#88BDF2]/20 active:scale-95'
              : 'border-[#6A89A7] text-[#6A89A7] hover:bg-[#BDDFC]/50 hover:shadow-md hover:shadow-[#6A89A7]/20 active:scale-95'
          }`}
        >
          Details
        </button>
        <button
          onClick={() => onToggleWatch?.(flight)}
          className={`flex-1 px-2 py-1 rounded text-xs font-semibold transition-all duration-200 flex items-center justify-center gap-1 ${
            isWatched
              ? isDark
                ? 'bg-[#505081]/70 text-[#88BDF2] hover:bg-[#505081]/90 hover:shadow-md hover:shadow-[#88BDF2]/20 active:scale-95'
                : 'bg-[#88BDF2]/40 text-[#6A89A7] border border-[#88BDF2]/60 hover:bg-[#88BDF2]/60 hover:shadow-md hover:shadow-[#88BDF2]/30 active:scale-95'
              : isDark
                ? 'bg-[#1A1A2E] text-[#8686AC] hover:bg-[#272757] hover:shadow-md hover:shadow-[#88BDF2]/10 active:scale-95'
                : 'bg-[#BDDFC]/40 text-[#6A89A7] hover:bg-[#BDDFC]/60 border border-[#BDDFC]/60 hover:shadow-md hover:shadow-[#BDDFC]/30 active:scale-95'
          }`}
        >
          {isWatched ? <FaHeart size={12} /> : <FaRegHeart size={12} />}
          {isWatched ? 'Watched' : 'Watch'}
        </button>
      </div>
    </div>
  )
}
