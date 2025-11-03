import React, { useState, useRef, useEffect } from 'react'

type Props = {
  onSearch: (params: { origin?: string; destination?: string; flightNumber?: string }) => void
}

// Common airport codes for autocomplete
const AIRPORT_SUGGESTIONS = [
  { code: 'ATL', city: 'Atlanta' },
  { code: 'BOS', city: 'Boston' },
  { code: 'DEN', city: 'Denver' },
  { code: 'DFW', city: 'Dallas' },
  { code: 'DXB', city: 'Dubai' },
  { code: 'FRA', city: 'Frankfurt' },
  { code: 'JFK', city: 'New York' },
  { code: 'LAS', city: 'Las Vegas' },
  { code: 'LAX', city: 'Los Angeles' },
  { code: 'LHR', city: 'London' },
  { code: 'MIA', city: 'Miami' },
  { code: 'ORD', city: 'Chicago' },
  { code: 'PHX', city: 'Phoenix' },
  { code: 'SEA', city: 'Seattle' },
  { code: 'SFO', city: 'San Francisco' },
  { code: 'YYZ', city: 'Toronto' },
]

// Common flight number prefixes for autocomplete
const FLIGHT_PREFIXES = ['AA', 'AC', 'BA', 'DA', 'FA', 'JA', 'SA', 'UA']

type AutocompleteState = {
  origin: string[]
  destination: string[]
  flightNumber: string[]
}

export default function SearchForm({ onSearch }: Props) {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [flightNumber, setFlightNumber] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<AutocompleteState>({ origin: [], destination: [], flightNumber: [] })
  const [activeSuggestion, setActiveSuggestion] = useState<{ field: string; index: number } | null>(null)

  const originInputRef = useRef<HTMLInputElement>(null)
  const destinationInputRef = useRef<HTMLInputElement>(null)
  const flightNumberInputRef = useRef<HTMLInputElement>(null)

  // Generate airport suggestions
  function getAirportSuggestions(input: string): string[] {
    if (input.length < 1) return []
    const upper = input.toUpperCase()
    return AIRPORT_SUGGESTIONS.filter(
      (airport) => airport.code.startsWith(upper) || airport.city.toUpperCase().startsWith(upper)
    )
      .map((a) => `${a.code} - ${a.city}`)
      .slice(0, 5)
  }

  // Generate flight number suggestions
  function getFlightNumberSuggestions(input: string): string[] {
    if (input.length < 1) return []
    const upper = input.toUpperCase()

    // If input starts with airline code, suggest flight numbers
    const matchingAirlines = FLIGHT_PREFIXES.filter((code) => code.startsWith(upper))
    if (matchingAirlines.length > 0) {
      return matchingAirlines.map((code) => `${code}100`).slice(0, 5)
    }

    // Otherwise show matching airline codes
    return FLIGHT_PREFIXES.filter((code) => code.startsWith(upper))
      .map((code) => code)
      .slice(0, 5)
  }

  // Handle input changes
  function handleOriginChange(value: string) {
    setOrigin(value)
    setActiveSuggestion(null)
    setSuggestions({
      ...suggestions,
      origin: getAirportSuggestions(value),
    })
  }

  function handleDestinationChange(value: string) {
    setDestination(value)
    setActiveSuggestion(null)
    setSuggestions({
      ...suggestions,
      destination: getAirportSuggestions(value),
    })
  }

  function handleFlightNumberChange(value: string) {
    setFlightNumber(value)
    setActiveSuggestion(null)
    setSuggestions({
      ...suggestions,
      flightNumber: getFlightNumberSuggestions(value),
    })
  }

  // Handle suggestion selection
  function selectSuggestion(field: string, suggestion: string) {
    if (field === 'origin') {
      setOrigin(suggestion.split(' - ')[0] || suggestion)
      setSuggestions({ ...suggestions, origin: [] })
      setActiveSuggestion(null)
      destinationInputRef.current?.focus()
    } else if (field === 'destination') {
      setDestination(suggestion.split(' - ')[0] || suggestion)
      setSuggestions({ ...suggestions, destination: [] })
      setActiveSuggestion(null)
      flightNumberInputRef.current?.focus()
    } else if (field === 'flightNumber') {
      setFlightNumber(suggestion)
      setSuggestions({ ...suggestions, flightNumber: [] })
      setActiveSuggestion(null)
    }
  }

  // Handle keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent, field: string, suggestionsArray: string[]) {
    if (suggestionsArray.length === 0) return

    const currentIndex = activeSuggestion?.field === field ? activeSuggestion.index : -1

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIndex = currentIndex < suggestionsArray.length - 1 ? currentIndex + 1 : 0
      setActiveSuggestion({ field, index: nextIndex })
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prevIndex = currentIndex > 0 ? currentIndex - 1 : suggestionsArray.length - 1
      setActiveSuggestion({ field, index: prevIndex })
    } else if (e.key === 'Enter' && currentIndex >= 0) {
      e.preventDefault()
      selectSuggestion(field, suggestionsArray[currentIndex])
    } else if (e.key === 'Escape') {
      setSuggestions({ origin: [], destination: [], flightNumber: [] })
      setActiveSuggestion(null)
    }
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (!target.closest('.autocomplete-container')) {
        setSuggestions({ origin: [], destination: [], flightNumber: [] })
        setActiveSuggestion(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    onSearch({ origin: origin.trim() || undefined, destination: destination.trim() || undefined, flightNumber: flightNumber.trim() || undefined })
  }

  function clearAndSearch() {
    setOrigin('')
    setDestination('')
    setFlightNumber('')
    setError(null)
    setSuggestions({ origin: [], destination: [], flightNumber: [] })
    setActiveSuggestion(null)
    onSearch({})
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
        {/* Origin Input */}
        <div className="autocomplete-container relative z-30">
          <input
            ref={originInputRef}
            aria-label="origin"
            value={origin}
            onChange={(e) => handleOriginChange(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, 'origin', suggestions.origin)}
            placeholder="Origin (e.g. JFK)"
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
          />
          {suggestions.origin.length > 0 && (
            <div className="absolute top-full left-0 z-50 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-lg">
              {suggestions.origin.map((s, i) => (
                <div
                  key={i}
                  onClick={() => selectSuggestion('origin', s)}
                  className={`px-3 py-2 cursor-pointer text-sm transition-colors ${
                    activeSuggestion?.field === 'origin' && activeSuggestion?.index === i
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Destination Input */}
        <div className="autocomplete-container relative z-30">
          <input
            ref={destinationInputRef}
            aria-label="destination"
            value={destination}
            onChange={(e) => handleDestinationChange(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, 'destination', suggestions.destination)}
            placeholder="Destination (e.g. LAX)"
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
          />
          {suggestions.destination.length > 0 && (
            <div className="absolute top-full left-0 z-50 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-lg">
              {suggestions.destination.map((s, i) => (
                <div
                  key={i}
                  onClick={() => selectSuggestion('destination', s)}
                  className={`px-3 py-2 cursor-pointer text-sm transition-colors ${
                    activeSuggestion?.field === 'destination' && activeSuggestion?.index === i
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Flight Number Input */}
        <div className="autocomplete-container relative z-30">
          <input
            ref={flightNumberInputRef}
            aria-label="flightNumber"
            value={flightNumber}
            onChange={(e) => handleFlightNumberChange(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, 'flightNumber', suggestions.flightNumber)}
            placeholder="Flight number (optional)"
            className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
          />
          {suggestions.flightNumber.length > 0 && (
            <div className="absolute top-full left-0 z-50 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-lg">
              {suggestions.flightNumber.map((s, i) => (
                <div
                  key={i}
                  onClick={() => selectSuggestion('flightNumber', s)}
                  className={`px-3 py-2 cursor-pointer text-sm transition-colors ${
                    activeSuggestion?.field === 'flightNumber' && activeSuggestion?.index === i
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          Search
        </button>
        <button type="button" onClick={clearAndSearch} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700 dark:border-gray-600 transition-colors">
          View All Flights
        </button>
      </div>
    </form>
  )
}
