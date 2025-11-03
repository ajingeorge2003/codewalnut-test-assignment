import React, { createContext, useContext, useEffect, useState } from 'react'

export type Flight = {
  id: string
  flightNumber: string
  airline: string
  origin: any
  destination: any
  departure?: any
  arrival?: any
  status?: string
  aircraft?: string
  duration?: string
  delay?: number
}

type WatchlistContextValue = {
  watchlist: Flight[]
  add: (f: Flight) => void
  remove: (id: string) => void
  toggle: (f: Flight) => void
}

const KEY = 'flight_explorer_watchlist_v1'

const WatchlistContext = createContext<WatchlistContextValue | undefined>(undefined)

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlist, setWatchlist] = useState<Flight[]>(() => {
    try {
      const raw = localStorage.getItem(KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(watchlist))
    } catch {
      // ignore write errors
    }
  }, [watchlist])

  const add = (f: Flight) => setWatchlist((s: Flight[]) => (s.find((x: Flight) => x.id === f.id) ? s : [...s, f]))
  const remove = (id: string) => setWatchlist((s: Flight[]) => s.filter((x: Flight) => x.id !== id))
  const toggle = (f: Flight) => setWatchlist((s: Flight[]) => (s.find((x: Flight) => x.id === f.id) ? s.filter((x: Flight) => x.id !== f.id) : [...s, f]))

  return (
    <WatchlistContext.Provider value={{ watchlist, add, remove, toggle }}>
      {children}
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  const ctx = useContext(WatchlistContext)
  if (!ctx) throw new Error('useWatchlist must be used inside WatchlistProvider')
  return ctx
}
