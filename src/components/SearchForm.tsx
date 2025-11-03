import React, { useState, useRef, useEffect } from 'react'

type Props = {
  onSearch: (params: { origin?: string; destination?: string; flightNumber?: string }) => void
  isDark?: boolean
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

export default function SearchForm({ onSearch, isDark = false }: Props) {
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

  // Generate flight number/airline suggestions
  function getFlightNumberSuggestions(input: string): string[] {
    if (input.length < 1) return []
    const upper = input.toUpperCase()

    // Show matching airline codes first
    const matchingAirlines = FLIGHT_PREFIXES.filter((code) => code.startsWith(upper))
    if (matchingAirlines.length > 0) {
      return matchingAirlines.map((code) => code).slice(0, 8)
    }

    return []
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
    <form onSubmit={submit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 relative">
        {/* Origin Input */}
        <div className="autocomplete-container relative z-30">
          <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-[#8686AC]' : 'text-white drop-shadow-sm'}`}>From</label>
          <input
            ref={originInputRef}
            aria-label="origin"
            value={origin}
            onChange={(e) => handleOriginChange(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, 'origin', suggestions.origin)}
            placeholder="Departure city"
            className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-0 transition-colors ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-300 focus:border-[#88BDF2]'
                : 'bg-white/90 border-white/60 text-[#384959] placeholder-[#6A89A7] focus:border-white focus:bg-white'
            }`}
            autoComplete="off"
          />
          {suggestions.origin.length > 0 && (
            <div className={`absolute top-full left-0 z-50 w-full mt-1 rounded-lg shadow-lg border ${
              isDark
                ? 'bg-gray-700 border-gray-600'
                : 'bg-white border-[#BDDFC]/40'
            }`}>
              {suggestions.origin.map((s, i) => (
                <div
                  key={i}
                  onClick={() => selectSuggestion('origin', s)}
                  className={`px-3 py-2 cursor-pointer text-sm transition-colors ${
                    activeSuggestion?.field === 'origin' && activeSuggestion?.index === i
                      ? isDark
                        ? 'bg-[#505081] text-white'
                        : 'bg-[#6A89A7] text-white'
                      : isDark
                        ? 'hover:bg-gray-600 text-white'
                        : 'hover:bg-[#BDDFC]/30 text-[#384959]'
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
          <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-[#8686AC]' : 'text-white drop-shadow-sm'}`}>To</label>
          <input
            ref={destinationInputRef}
            aria-label="destination"
            value={destination}
            onChange={(e) => handleDestinationChange(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, 'destination', suggestions.destination)}
            placeholder="Arrival city"
            className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-0 transition-colors ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-300 focus:border-[#88BDF2]'
                : 'bg-white/90 border-white/60 text-[#384959] placeholder-[#6A89A7] focus:border-white focus:bg-white'
            }`}
            autoComplete="off"
            />
          {suggestions.destination.length > 0 && (
            <div className={`absolute top-full left-0 z-50 w-full mt-1 rounded-lg shadow-lg border ${
              isDark
                ? 'bg-gray-700 border-gray-600'
                : 'bg-white border-[#BDDFC]/40'
            }`}>
              {suggestions.destination.map((s, i) => (
                <div
                  key={i}
                  onClick={() => selectSuggestion('destination', s)}
                  className={`px-3 py-2 cursor-pointer text-sm transition-colors ${
                    activeSuggestion?.field === 'destination' && activeSuggestion?.index === i
                      ? isDark
                        ? 'bg-[#505081] text-white'
                        : 'bg-[#6A89A7] text-white'
                      : isDark
                        ? 'hover:bg-gray-600 text-white'
                        : 'hover:bg-[#BDDFC]/30 text-[#384959]'
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Airline Input */}
        <div className="autocomplete-container relative z-30">
          <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-[#8686AC]' : 'text-white drop-shadow-sm'}`}>Airline</label>
          <input
            ref={flightNumberInputRef}
            aria-label="flightNumber"
            value={flightNumber}
            onChange={(e) => handleFlightNumberChange(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, 'flightNumber', suggestions.flightNumber)}
            placeholder="Airline code"
            className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-0 transition-colors ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-300 focus:border-[#88BDF2]'
                : 'bg-white/90 border-white/60 text-[#384959] placeholder-[#6A89A7] focus:border-white focus:bg-white'
            }`}
            autoComplete="off"
          />
          {suggestions.flightNumber.length > 0 && (
            <div className={`absolute top-full left-0 z-50 w-full mt-1 rounded-lg shadow-lg border ${
              isDark
                ? 'bg-gray-700 border-gray-600'
                : 'bg-white border-[#BDDFC]/40'
            }`}>
              {suggestions.flightNumber.map((s, i) => (
                <div
                  key={i}
                  onClick={() => selectSuggestion('flightNumber', s)}
                  className={`px-3 py-2 cursor-pointer text-sm transition-colors ${
                    activeSuggestion?.field === 'flightNumber' && activeSuggestion?.index === i
                      ? isDark
                        ? 'bg-[#505081] text-white'
                        : 'bg-[#6A89A7] text-white'
                      : isDark
                        ? 'hover:bg-gray-600 text-white'
                        : 'hover:bg-[#BDDFC]/30 text-[#384959]'
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <div className="flex flex-col justify-end">
          <button 
            type="submit" 
            className={`w-full px-6 py-3 font-semibold rounded-lg transition-all duration-300 shadow-md ${
              isDark
                ? 'bg-[#505081] text-[#E8E8F0] hover:bg-[#8686AC] hover:shadow-lg hover:shadow-[#88BDF2]/40 active:scale-95'
                : 'bg-white text-[#6A89A7] border-2 border-[#BDDFC] hover:bg-gradient-to-r hover:from-white hover:to-[#BDDFC]/20 hover:shadow-lg hover:shadow-[#6A89A7]/25 active:scale-95'
            }`}
          >
            Search Flights
          </button>
        </div>
      </div>

      {error && <div className={`text-sm ${isDark ? 'text-red-400' : 'text-white drop-shadow-sm'}`}>{error}</div>}

      <div className="flex gap-2 pt-2">
        <button 
          type="button" 
          onClick={clearAndSearch} 
          className={`px-4 py-2 border-2 font-semibold rounded-lg transition-all duration-300 ${
            isDark
              ? 'border-[#505081] text-[#88BDF2] hover:bg-[#505081]/50 hover:shadow-md hover:shadow-[#88BDF2]/30 active:scale-95'
              : 'border-white text-white hover:bg-white/10 hover:shadow-md hover:shadow-white/20 active:scale-95'
          }`}
        >
          View All Flights
        </button>
      </div>
    </form>
  )
}
