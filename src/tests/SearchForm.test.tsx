import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'
import SearchForm from '../components/SearchForm'

describe('SearchForm', () => {
  test('shows validation when submitting empty', () => {
    const onSearch = vi.fn()
    render(<SearchForm onSearch={onSearch} />)
    fireEvent.submit(screen.getByRole('button', { name: /search/i }))
    expect(screen.getByText(/please enter origin/i)).toBeInTheDocument()
    expect(onSearch).not.toHaveBeenCalled()
  })
})
