import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import FlightCard from '../components/FlightCard'

const sample = { id: '1', flightNumber: 'A1', airline: 'Air', origin: { code: 'JFK' }, destination: { code: 'LAX' }, status: 'On Time' }

describe('FlightCard', () => {
  test('renders main fields', () => {
    render(<FlightCard flight={sample} />)
    expect(screen.getByText(/Air/)).toBeInTheDocument()
    expect(screen.getByText(/A1/)).toBeInTheDocument()
  })
})
