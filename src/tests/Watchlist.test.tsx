import React from 'react'
import { renderHook, act } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { WatchlistProvider, useWatchlist } from '../context/WatchlistContext'

function wrapper({ children }: any) {
  return <WatchlistProvider>{children}</WatchlistProvider>
}

describe('WatchlistContext', () => {
  test('add and remove persist', () => {
    const { result } = renderHook(() => useWatchlist(), { wrapper })

    act(() => {
      result.current.add({ id: '1', flightNumber: 'F1', airline: 'A', origin: {}, destination: {} })
    })
    expect(result.current.watchlist.length).toBe(1)

    act(() => result.current.remove('1'))
    expect(result.current.watchlist.length).toBe(0)
  })
})
