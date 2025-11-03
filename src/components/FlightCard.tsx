import React from 'react'
import { Flight } from '../context/WatchlistContext'
import { FaPlane, FaClock, FaCheckCircle, FaExclamationCircle, FaTimesCircle, FaHeart, FaRegHeart } from 'react-icons/fa'

type Props = {
  flight: Flight
  onSelect?: (f: Flight) => void
  onToggleWatch?: (f: Flight) => void
  isWatched?: boolean
}

function statusConfig(s?: string) {
  if (!s) return { color: 'bg-gray-100 text-gray-800', icon: FaClock, label: 'Unknown' }
  const lower = s.toLowerCase()
  if (lower.includes('cancel')) return { color: 'bg-red-100 text-red-800', icon: FaTimesCircle, label: 'Cancelled' }
  if (lower.includes('delay')) return { color: 'bg-yellow-100 text-yellow-800', icon: FaExclamationCircle, label: 'Delayed' }
  return { color: 'bg-green-100 text-green-800', icon: FaCheckCircle, label: 'On Time' }
}

export default function FlightCard({ flight, onSelect, onToggleWatch, isWatched }: Props) {
  const status = statusConfig(flight.status)
  const StatusIcon = status.icon

  const formatTime = (isoString?: string) => {
    if (!isoString) return '—'
    const date = new Date(isoString)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  }

  return (
    <div className="flight-card animate-fade-in p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 flex-1">
          <FaPlane className="text-blue-600 text-xl" />
          <div>
            <div className="font-bold text-lg text-gray-900 dark:text-white">{flight.flightNumber}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{flight.airline}</div>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${status.color}`}>
          <StatusIcon size={14} />
          {status.label}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
        {/* From */}
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">From</div>
          <div className="font-bold text-lg text-gray-900 dark:text-white">{flight.origin?.code || '—'}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">{flight.origin?.city || ''}</div>
        </div>

        {/* Arrow & Duration */}
        <div className="flex flex-col items-center justify-center">
          <FaPlane className="text-gray-400 rotate-90 mb-1" />
          <div className="text-xs text-gray-500">{flight.duration || '—'}</div>
        </div>

        {/* To */}
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">To</div>
          <div className="font-bold text-lg text-gray-900 dark:text-white">{flight.destination?.code || '—'}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">{flight.destination?.city || ''}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Departure</div>
          <div className="font-semibold text-gray-900 dark:text-white">{formatTime(flight.departure?.scheduled)}</div>
          {flight.departure?.actual && (
            <div className="text-xs text-gray-600 dark:text-gray-400">Actual: {formatTime(flight.departure.actual)}</div>
          )}
        </div>
        <div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">Arrival</div>
          <div className="font-semibold text-gray-900 dark:text-white">{formatTime(flight.arrival?.scheduled)}</div>
          {flight.arrival?.estimated && (
            <div className="text-xs text-gray-600 dark:text-gray-400">Est: {formatTime(flight.arrival.estimated)}</div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onSelect?.(flight)}
          className="flex-1 px-3 py-2 rounded border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 text-sm font-semibold transition-colors"
        >
          Details
        </button>
        <button
          onClick={() => onToggleWatch?.(flight)}
          className={`flex-1 px-3 py-2 rounded text-sm font-semibold transition-colors flex items-center justify-center gap-1 ${
            isWatched
              ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'
          }`}
        >
          {isWatched ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
          {isWatched ? 'Watched' : 'Watch'}
        </button>
      </div>
    </div>
  )
}
