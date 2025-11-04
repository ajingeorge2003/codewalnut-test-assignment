import React, { useState, useEffect } from 'react'
import { FaPlane, FaHeart, FaSun, FaMoon } from 'react-icons/fa'
import { Analytics } from '@vercel/analytics/react'
import HomePage from './pages/HomePage'
import Home from './pages/Home'
import WatchlistPage from './pages/WatchlistPage'
import { WatchlistProvider, useWatchlist } from './context/WatchlistContext'

function AppContent() {
  const [view, setView] = useState<'landing' | 'search' | 'watchlist'>('landing')
  const [isDark, setIsDark] = useState(false)
  const { watchlist } = useWatchlist()

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark
    setIsDark(shouldBeDark)
    if (shouldBeDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
    if (newIsDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div style={{backgroundColor: isDark ? '#0F0E47' : '#FFFFFF', color: isDark ? '#E8E8F0' : '#384959'}} className={`min-h-screen flex flex-col relative`}>
      {/* Background SVG Pattern */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none" style={{opacity: isDark ? 0.03 : 0.05}} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="airports" x="80" y="80" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="40" cy="40" r="3" fill={isDark ? '#88BDF2' : '#6A89A7'} />
            <line x1="40" y1="35" x2="40" y2="10" stroke={isDark ? '#88BDF2' : '#6A89A7'} strokeWidth="0.5" strokeDasharray="2,2" />
            <line x1="40" y1="45" x2="40" y2="70" stroke={isDark ? '#88BDF2' : '#6A89A7'} strokeWidth="0.5" strokeDasharray="2,2" />
            <line x1="35" y1="40" x2="10" y2="40" stroke={isDark ? '#88BDF2' : '#6A89A7'} strokeWidth="0.5" strokeDasharray="2,2" />
            <line x1="45" y1="40" x2="70" y2="40" stroke={isDark ? '#88BDF2' : '#6A89A7'} strokeWidth="0.5" strokeDasharray="2,2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#airports)" />
      </svg>

      {/* Background Image with 50% Opacity */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.2,
          filter: isDark ? 'brightness(0.5)' : 'brightness(1)',
        }}
      ></div>

      {/* Animated background for light theme */}
      {!isDark && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#BDDFC]/20 to-[#88BDF2]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-[#6A89A7]/10 to-[#BDDFC]/15 rounded-full blur-3xl"></div>
        </div>
      )}

      {/* Animated background for dark theme */}
      {isDark && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-20 w-96 h-96 bg-gradient-to-br from-[#505081]/15 to-[#88BDF2]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tl from-[#505081]/10 to-[#272757]/20 rounded-full blur-3xl"></div>
        </div>
      )}

      {/* Header */}
      <header className={`relative ${isDark ? 'bg-[#272757] border-[#505081]' : 'bg-white/80 backdrop-blur-sm border-[#BDDFC]/30'} shadow-md border-b`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Title - Clickable */}
            <button
              onClick={() => setView('landing')}
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <div className={`p-2.5 rounded-lg ${
                isDark 
                  ? 'bg-[#505081]' 
                  : 'bg-gradient-to-br from-[#6A89A7] to-[#88BDF2]'
              }`}>
                <FaPlane className={isDark ? 'text-[#88BDF2]' : 'text-white'} size={26} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold ${isDark ? 'text-[#E8E8F0]' : 'text-[#384959]'}`}>Flight Explorer</h1>
                <p className={`text-xs ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>Find flights</p>
              </div>
            </button>

            {/* Navigation and Theme Toggle */}
            <nav className="flex items-center gap-3">
              <button
                onClick={() => setView('landing')}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm ${
                  view === 'landing'
                    ? isDark
                      ? 'bg-[#505081] text-[#E8E8F0] shadow-md'
                      : 'bg-gradient-to-r from-[#6A89A7] to-[#88BDF2] text-white shadow-md'
                    : isDark
                      ? 'bg-[#1A1A2E] text-[#8686AC] hover:bg-[#272757]'
                      : 'bg-[#BDDFC]/40 text-[#384959] hover:bg-[#BDDFC]/60 border border-[#BDDFC]/50'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setView('search')}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm ${
                  view === 'search'
                    ? isDark
                      ? 'bg-[#505081] text-[#E8E8F0] shadow-md'
                      : 'bg-gradient-to-r from-[#6A89A7] to-[#88BDF2] text-white shadow-md'
                    : isDark
                      ? 'bg-[#1A1A2E] text-[#8686AC] hover:bg-[#272757]'
                      : 'bg-[#BDDFC]/40 text-[#384959] hover:bg-[#BDDFC]/60 border border-[#BDDFC]/50'
                }`}
              >
                Search
              </button>
              <button
                onClick={() => setView('watchlist')}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm flex items-center gap-2 ${
                  view === 'watchlist'
                    ? isDark
                      ? 'bg-[#505081] text-[#E8E8F0] shadow-md'
                      : 'bg-gradient-to-r from-[#88BDF2] to-[#6A89A7] text-white shadow-md'
                    : isDark
                      ? 'bg-[#1A1A2E] text-[#8686AC] hover:bg-[#272757]'
                      : 'bg-[#BDDFC]/40 text-[#384959] hover:bg-[#BDDFC]/60 border border-[#BDDFC]/50'
                }`}
              >
                <FaHeart size={16} />
                <span>
                  Saved
                  {watchlist.length > 0 && <span className={`ml-1.5 font-bold px-2 py-0.5 rounded-full text-xs ${isDark ? 'bg-[#505081] text-[#88BDF2]' : 'bg-white text-[#6A89A7] border border-[#88BDF2]/50'}`}>({watchlist.length})</span>}
                </span>
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-lg transition-all shadow-sm ml-2 ${
                  isDark
                    ? 'bg-[#505081] text-[#88BDF2] hover:bg-[#8686AC] hover:text-[#E8E8F0]'
                    : 'bg-gradient-to-br from-[#BDDFC]/60 to-[#88BDF2]/50 text-[#384959] hover:from-[#BDDFC] hover:to-[#88BDF2] border border-[#BDDFC]/50'
                }`}
                title={isDark ? 'Switch to light mode (Stormy morning)' : 'Switch to dark mode (Blue eclipse)'}
              >
                {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`relative flex-grow max-w-7xl mx-auto px-4 py-6 w-full ${isDark ? 'text-[#E8E8F0]' : 'text-[#384959]'}`}>
        {view === 'landing' && <HomePage isDark={isDark} onNavigateSearch={() => setView('search')} onNavigateWatchlist={() => setView('watchlist')} />}
        {view === 'search' && <Home isDark={isDark} />}
        {view === 'watchlist' && <WatchlistPage isDark={isDark} />}
      </main>

      {/* Footer */}
      <footer className={`relative mt-12 py-6 border-t ${isDark ? 'border-[#505081] bg-[#272757] text-[#8686AC]' : 'border-[#BDDFC]/30 bg-gradient-to-r from-[#BDDFC]/10 to-[#88BDF2]/10 text-[#6A89A7]'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
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
      <Analytics />
    </WatchlistProvider>
  )
}
