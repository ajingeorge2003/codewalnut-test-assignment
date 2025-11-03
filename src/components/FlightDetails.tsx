import React from 'react'
import { FaPlane, FaClock, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa'
import { Flight } from '../context/WatchlistContext'

type Props = { flight: Flight }

function statusBadge(status?: string) {
  if (!status) return { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Unknown' }
  const lower = status.toLowerCase()
  if (lower.includes('cancel')) return { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' }
  if (lower.includes('delay')) return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Delayed' }
  return { bg: 'bg-green-100', text: 'text-green-800', label: 'On Time' }
}

function formatDateTime(dateStr?: string) {
  if (!dateStr) return '—'
  try {
    const date = new Date(dateStr)
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true })
  } catch {
    return dateStr
  }
}

export default function FlightDetails({ flight }: Props) {
  const statusStyle = statusBadge(flight.status)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between pb-4 border-b border-gray-200 dark:border-gray-700">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{flight.airline}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Flight {flight.flightNumber}</p>
        </div>
        <div className={`px-4 py-2 rounded-full font-semibold text-sm ${statusStyle.bg} ${statusStyle.text}`}>
          {statusStyle.label}
        </div>
      </div>

      {/* Route Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* From */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FaMapMarkerAlt className="text-blue-600" size={14} />
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Departure</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{flight.origin?.code || '—'}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{flight.origin?.city || '—'}</p>
          {flight.departure?.scheduled && (
            <p className="text-xs text-gray-500 mt-1">{formatDateTime(flight.departure.scheduled)}</p>
          )}
          {flight.departure?.actual && (
            <p className="text-xs text-blue-600 dark:text-blue-400">Actual: {formatDateTime(flight.departure.actual)}</p>
          )}
        </div>

        {/* Duration */}
        <div className="flex flex-col items-center justify-start pt-6">
          <FaPlane className="text-gray-400 text-2xl mb-2 transform -rotate-45" />
          <div className="flex-1 w-0.5 bg-gradient-to-b from-gray-400 to-transparent my-2" style={{ height: '80px' }}></div>
          {flight.duration && (
            <div className="text-center">
              <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Duration</div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{flight.duration}</p>
            </div>
          )}
        </div>

        {/* To */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FaMapMarkerAlt className="text-red-600" size={14} />
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Arrival</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{flight.destination?.code || '—'}</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{flight.destination?.city || '—'}</p>
          {flight.arrival?.scheduled && (
            <p className="text-xs text-gray-500 mt-1">{formatDateTime(flight.arrival.scheduled)}</p>
          )}
          {flight.arrival?.actual && (
            <p className="text-xs text-blue-600 dark:text-blue-400">Actual: {formatDateTime(flight.arrival.actual)}</p>
          )}
        </div>
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        {/* Aircraft */}
        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <FaPlane className="text-gray-600 dark:text-gray-400" size={12} />
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Aircraft</span>
          </div>
          <p className="text-sm font-semibold text-gray-900 dark:text-white">{flight.aircraft || 'Not specified'}</p>
        </div>

        {/* Delay Information */}
        {flight.delay && flight.delay > 0 && (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900 rounded-lg border border-yellow-200 dark:border-yellow-700">
            <div className="flex items-center gap-2 mb-1">
              <FaClock className="text-yellow-600 dark:text-yellow-400" size={12} />
              <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 uppercase">Delay</span>
            </div>
            <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-200">{flight.delay} minutes</p>
          </div>
        )}

        {/* Schedule Times */}
        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <FaClock className="text-gray-600 dark:text-gray-400" size={12} />
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Schedule</span>
          </div>
          <div className="text-xs space-y-1">
            <div className="text-gray-700 dark:text-gray-300">
              Depart: <span className="font-mono">{flight.departure?.scheduled ? formatDateTime(flight.departure.scheduled).split(', ')[1] : '—'}</span>
            </div>
            <div className="text-gray-700 dark:text-gray-300">
              Arrive: <span className="font-mono">{flight.arrival?.scheduled ? formatDateTime(flight.arrival.scheduled).split(', ')[1] : '—'}</span>
            </div>
          </div>
        </div>

        {/* Status Info */}
        <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-200 dark:border-blue-700">
          <div className="flex items-center gap-2 mb-1">
            <FaInfoCircle className="text-blue-600 dark:text-blue-400" size={12} />
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase">Flight Status</span>
          </div>
          <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">{flight.status || 'Not available'}</p>
        </div>
      </div>

      {/* Note */}
      <div className="p-3 bg-amber-50 dark:bg-amber-900 rounded-lg border border-amber-200 dark:border-amber-700 text-xs text-amber-800 dark:text-amber-200">
        [INFO] Information is based on the most recent data from the flight system.
      </div>
    </div>
  )
}
