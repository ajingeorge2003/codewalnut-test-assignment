import React, { useState } from 'react'
import { FaPlane, FaHeart } from 'react-icons/fa'
import Home from './pages/Home'
import WatchlistPage from './pages/WatchlistPage'
import { WatchlistProvider, useWatchlist } from './context/WatchlistContext'

function AppContent() {
  const [view, setView] = useState<'home' | 'watchlist'>('home')
  const { watchlist } = useWatchlist()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Title */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <FaPlane className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Flight Explorer</h1>
                <p className="text-xs text-gray-600 dark:text-gray-400">Find and track flights</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center gap-2">
              <button
                onClick={() => setView('home')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  view === 'home'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Search
              </button>
              <button
                onClick={() => setView('watchlist')}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  view === 'watchlist'
                    ? 'bg-red-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <FaHeart size={16} />
                <span>
                  Watchlist
                  {watchlist.length > 0 && <span className="ml-1 font-bold">({watchlist.length})</span>}
                </span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {view === 'home' ? <Home /> : <WatchlistPage />}
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Flight Explorer © 2024 • All flight data is for demonstration purposes</p>
        </div>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <WatchlistProvider>
      <AppContent />
    </WatchlistProvider>
  )
}
