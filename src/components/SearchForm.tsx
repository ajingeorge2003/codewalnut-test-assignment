import React, { useState } from 'react'

type Props = {
  onSearch: (params: { origin?: string; destination?: string; flightNumber?: string }) => void
}

export default function SearchForm({ onSearch }: Props) {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [flightNumber, setFlightNumber] = useState('')
  const [error, setError] = useState<string | null>(null)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    // Pass all params (empty ones become undefined)
    onSearch({ origin: origin.trim() || undefined, destination: destination.trim() || undefined, flightNumber: flightNumber.trim() || undefined })
  }

  function clearAndSearch() {
    setOrigin('')
    setDestination('')
    setFlightNumber('')
    setError(null)
    onSearch({})
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input aria-label="origin" value={origin} onChange={(e) => setOrigin(e.target.value)} placeholder="Origin (e.g. JFK)" className="p-2 border rounded" />
        <input aria-label="destination" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destination (e.g. LAX)" className="p-2 border rounded" />
        <input aria-label="flightNumber" value={flightNumber} onChange={(e) => setFlightNumber(e.target.value)} placeholder="Flight number (optional)" className="p-2 border rounded" />
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Search</button>
        <button type="button" onClick={clearAndSearch} className="px-4 py-2 border rounded hover:bg-gray-100">View All Flights</button>
      </div>
    </form>
  )
}
