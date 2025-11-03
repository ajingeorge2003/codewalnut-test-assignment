import React from 'react'
import { FaPlane, FaClock, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa'
import { Flight } from '../context/WatchlistContext'

type Props = { flight: Flight; isDark?: boolean }

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

export default function FlightDetails({ flight, isDark = false }: Props) {
  const statusStyle = statusBadge(flight.status)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`flex items-start justify-between pb-4 border-b ${isDark ? 'border-[#505081]' : 'border-[#BDDFC]/40'}`}>
        <div>
          <h3 className={`text-2xl font-bold ${isDark ? 'text-[#E8E8F0]' : 'text-[#384959]'}`}>{flight.airline}</h3>
          <p className={`text-sm ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>Flight {flight.flightNumber}</p>
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
            <FaMapMarkerAlt className={isDark ? 'text-[#88BDF2]' : 'text-[#6A89A7]'} size={14} />
            <span className={`text-xs font-semibold uppercase ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>Departure</span>
          </div>
          <div className={`text-2xl font-bold ${isDark ? 'text-[#E8E8F0]' : 'text-[#384959]'}`}>{flight.origin?.code || '—'}</div>
          <p className={`text-sm ${isDark ? 'text-[#8686AC]' : 'text-[#88BDF2]/70'}`}>{flight.origin?.city || '—'}</p>
          {flight.departure?.scheduled && (
            <p className={`text-xs mt-1 ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>{formatDateTime(flight.departure.scheduled)}</p>
          )}
          {flight.departure?.actual && (
            <p className={`text-xs ${isDark ? 'text-[#88BDF2]' : 'text-[#6A89A7]'}`}>Actual: {formatDateTime(flight.departure.actual)}</p>
          )}
        </div>

        {/* Duration */}
        <div className="flex flex-col items-center justify-start pt-6">
          <FaPlane className={`text-2xl mb-2 transform -rotate-45 ${isDark ? 'text-[#505081]' : 'text-[#BDDFC]/60'}`} />
          <div className={`flex-1 w-0.5 bg-gradient-to-b my-2 ${isDark ? 'from-[#505081] to-transparent' : 'from-[#BDDFC]/60 to-transparent'}`} style={{ height: '80px' }}></div>
          {flight.duration && (
            <div className="text-center">
              <div className={`text-xs font-semibold uppercase ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>Duration</div>
              <p className={`text-sm font-bold ${isDark ? 'text-[#E8E8F0]' : 'text-[#384959]'}`}>{flight.duration}</p>
            </div>
          )}
        </div>

        {/* To */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <FaMapMarkerAlt className={isDark ? 'text-[#88BDF2]' : 'text-[#6A89A7]'} size={14} />
            <span className={`text-xs font-semibold uppercase ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>Arrival</span>
          </div>
          <div className={`text-2xl font-bold ${isDark ? 'text-[#E8E8F0]' : 'text-[#384959]'}`}>{flight.destination?.code || '—'}</div>
          <p className={`text-sm ${isDark ? 'text-[#8686AC]' : 'text-[#88BDF2]/70'}`}>{flight.destination?.city || '—'}</p>
          {flight.arrival?.scheduled && (
            <p className={`text-xs mt-1 ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>{formatDateTime(flight.arrival.scheduled)}</p>
          )}
          {flight.arrival?.actual && (
            <p className={`text-xs ${isDark ? 'text-[#88BDF2]' : 'text-[#6A89A7]'}`}>Actual: {formatDateTime(flight.arrival.actual)}</p>
          )}
        </div>
      </div>

      {/* Additional Details */}
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t ${isDark ? 'border-[#505081]' : 'border-[#BDDFC]/40'}`}>
        {/* Aircraft */}
        <div className={`p-3 rounded-lg ${isDark ? 'bg-[#272757] border border-[#505081]' : 'bg-[#BDDFC]/20 border border-[#BDDFC]/40'}`}>
          <div className="flex items-center gap-2 mb-1">
            <FaPlane className={isDark ? 'text-[#88BDF2]' : 'text-[#6A89A7]'} size={12} />
            <span className={`text-xs font-semibold uppercase ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>Aircraft</span>
          </div>
          <p className={`text-sm font-semibold ${isDark ? 'text-[#E8E8F0]' : 'text-[#384959]'}`}>{flight.aircraft || 'Not specified'}</p>
        </div>

        {/* Delay Information */}
        {flight.delay && flight.delay > 0 ? (
          <div className={`p-3 rounded-lg border ${isDark ? 'bg-[#3E2D5C] border-[#505081]' : 'bg-yellow-50 border-yellow-200'}`}>
            <div className="flex items-center gap-2 mb-1">
              <FaClock className={isDark ? 'text-[#88BDF2]' : 'text-yellow-600'} size={12} />
              <span className={`text-xs font-semibold uppercase ${isDark ? 'text-[#88BDF2]' : 'text-yellow-600'}`}>Delay</span>
            </div>
            <p className={`text-sm font-semibold ${isDark ? 'text-[#BDDFC]' : 'text-yellow-900'}`}>{flight.delay} minutes</p>
          </div>
        ) : (
          <div className={`p-3 rounded-lg border ${isDark ? 'bg-[#2D4A3E] border-[#505081]' : 'bg-green-50 border-green-200'}`}>
            <div className="flex items-center gap-2 mb-1">
              <FaClock className={isDark ? 'text-[#88BDF2]' : 'text-green-600'} size={12} />
              <span className={`text-xs font-semibold uppercase ${isDark ? 'text-[#88BDF2]' : 'text-green-600'}`}>Delay</span>
            </div>
            <p className={`text-sm font-semibold ${isDark ? 'text-[#BDDFC]' : 'text-green-700'}`}>On Schedule</p>
          </div>
        )}

        {/* Schedule Times */}
        <div className={`p-3 rounded-lg ${isDark ? 'bg-[#272757] border border-[#505081]' : 'bg-[#BDDFC]/20 border border-[#BDDFC]/40'}`}>
          <div className="flex items-center gap-2 mb-2">
            <FaClock className={isDark ? 'text-[#88BDF2]' : 'text-[#6A89A7]'} size={12} />
            <span className={`text-xs font-semibold uppercase ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>Schedule</span>
          </div>
          <div className="text-xs space-y-1">
            <div className={isDark ? 'text-[#E8E8F0]' : 'text-[#384959]'}>
              Depart: <span className="font-mono">{flight.departure?.scheduled ? formatDateTime(flight.departure.scheduled).split(', ')[1] : '—'}</span>
            </div>
            <div className={isDark ? 'text-[#E8E8F0]' : 'text-[#384959]'}>
              Arrive: <span className="font-mono">{flight.arrival?.scheduled ? formatDateTime(flight.arrival.scheduled).split(', ')[1] : '—'}</span>
            </div>
          </div>
        </div>

        {/* Status Info */}
        <div className={`p-3 rounded-lg border ${isDark ? 'bg-[#3E3E5C] border-[#505081]' : 'bg-[#88BDF2]/20 border-[#88BDF2]/40'}`}>
          <div className="flex items-center gap-2 mb-1">
            <FaInfoCircle className={isDark ? 'text-[#88BDF2]' : 'text-[#6A89A7]'} size={12} />
            <span className={`text-xs font-semibold uppercase ${isDark ? 'text-[#88BDF2]' : 'text-[#6A89A7]'}`}>Flight Status</span>
          </div>
          <p className={`text-sm font-semibold ${isDark ? 'text-[#BDDFC]' : 'text-[#384959]'}`}>{flight.status || 'Not available'}</p>
        </div>
      </div>

      {/* Note */}
      <div className={`p-3 rounded-lg border ${isDark ? 'bg-[#3E2D5C] border-[#505081] text-[#8686AC]' : 'bg-[#BDDFC]/20 border-[#BDDFC]/40 text-[#6A89A7]'} text-xs`}>
        [INFO] Information is based on the most recent data from the flight system.
      </div>
    </div>
  )
}
