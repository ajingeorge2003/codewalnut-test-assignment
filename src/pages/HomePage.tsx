import React from 'react'
import { FaPlane, FaSearch, FaHeart, FaTrophy, FaClipboardList, FaArrowRight } from 'react-icons/fa'

type Props = {
  isDark?: boolean
  onNavigateSearch: () => void
  onNavigateWatchlist: () => void
}

export default function HomePage({ isDark = false, onNavigateSearch, onNavigateWatchlist }: Props) {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className={`rounded-lg shadow-lg overflow-hidden ${isDark ? 'bg-[#272757]' : 'bg-gradient-to-r from-[#6A89A7] to-[#88BDF2]'}`}>
        <div className="px-6 py-12 md:py-16 text-center">
          <div className="flex justify-center mb-4">
            <FaPlane className={`text-5xl ${isDark ? 'text-[#88BDF2]' : 'text-white'}`} />
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isDark ? 'text-[#E8E8F0]' : 'text-white'}`}>
            Welcome to Flight Explorer
          </h1>
          <p className={`text-lg mb-8 ${isDark ? 'text-[#BDDFC]' : 'text-white/90'}`}>
            Find and book the perfect flight for your journey
          </p>
          <button
            onClick={onNavigateSearch}
            className={`px-8 py-3 rounded-lg font-semibold transition-all shadow-md flex items-center justify-center gap-2 mx-auto ${
              isDark
                ? 'bg-[#505081] text-[#E8E8F0] hover:bg-[#8686AC] hover:shadow-lg'
                : 'bg-white text-[#6A89A7] hover:shadow-lg active:scale-95'
            }`}
          >
            <FaSearch size={18} />
            Start Searching
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-[#272757] border border-[#505081]' : 'bg-white/90 border border-[#BDDFC]/50'}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm font-semibold ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>Available Flights</p>
              <p className={`text-3xl font-bold mt-2 ${isDark ? 'text-[#BDDFC]' : 'text-[#384959]'}`}>100+</p>
            </div>
            <FaPlane className={`text-3xl ${isDark ? 'text-[#505081]' : 'text-[#BDDFC]/40'}`} />
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-[#272757] border border-[#505081]' : 'bg-white/90 border border-[#BDDFC]/50'}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm font-semibold ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>Routes Covered</p>
              <p className={`text-3xl font-bold mt-2 ${isDark ? 'text-[#BDDFC]' : 'text-[#384959]'}`}>16+</p>
            </div>
            <FaClipboardList className={`text-3xl ${isDark ? 'text-[#505081]' : 'text-[#BDDFC]/40'}`} />
          </div>
        </div>

        <div className={`p-6 rounded-lg shadow-md ${isDark ? 'bg-[#272757] border border-[#505081]' : 'bg-white/90 border border-[#BDDFC]/50'}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm font-semibold ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>Airlines</p>
              <p className={`text-3xl font-bold mt-2 ${isDark ? 'text-[#BDDFC]' : 'text-[#384959]'}`}>8+</p>
            </div>
            <FaTrophy className={`text-3xl ${isDark ? 'text-[#505081]' : 'text-[#BDDFC]/40'}`} />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div>
        <h2 className={`text-2xl font-bold mb-4 ${isDark ? 'text-[#E8E8F0]' : 'text-[#384959]'}`}>How it Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search Card */}
          <div
            onClick={onNavigateSearch}
            className={`p-6 rounded-lg shadow-md cursor-pointer transition-all hover:shadow-lg ${
              isDark ? 'bg-[#272757] border border-[#505081] hover:border-[#88BDF2]' : 'bg-white/90 border border-[#BDDFC]/50 hover:border-[#88BDF2]'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <FaSearch className={`text-3xl ${isDark ? 'text-[#88BDF2]' : 'text-[#6A89A7]'}`} />
              <FaArrowRight className={`text-xl ${isDark ? 'text-[#505081]' : 'text-[#BDDFC]/40'}`} />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-[#E8E8F0]' : 'text-[#384959]'}`}>Search Flights</h3>
            <p className={`text-sm ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>
              Find flights by entering departure airport, arrival airport, or airline code. Get real-time flight information.
            </p>
          </div>

          {/* Watchlist Card */}
          <div
            onClick={onNavigateWatchlist}
            className={`p-6 rounded-lg shadow-md cursor-pointer transition-all hover:shadow-lg ${
              isDark ? 'bg-[#272757] border border-[#505081] hover:border-[#88BDF2]' : 'bg-white/90 border border-[#BDDFC]/50 hover:border-[#88BDF2]'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <FaHeart className={`text-3xl ${isDark ? 'text-[#88BDF2]' : 'text-[#6A89A7]'}`} />
              <FaArrowRight className={`text-xl ${isDark ? 'text-[#505081]' : 'text-[#BDDFC]/40'}`} />
            </div>
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-[#E8E8F0]' : 'text-[#384959]'}`}>View Saved Flights</h3>
            <p className={`text-sm ${isDark ? 'text-[#8686AC]' : 'text-[#6A89A7]'}`}>
              Keep track of flights you're interested in. Save your favorite flights and check their details anytime.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Access Buttons */}
      <div className={`p-6 rounded-lg ${isDark ? 'bg-[#3E2D5C] border border-[#505081]' : 'bg-[#BDDFC]/20 border border-[#BDDFC]/40'}`}>
        <h3 className={`text-lg font-bold mb-4 ${isDark ? 'text-[#E8E8F0]' : 'text-[#384959]'}`}>Quick Access</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button
            onClick={onNavigateSearch}
            className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
              isDark
                ? 'bg-[#505081] text-[#88BDF2] hover:bg-[#8686AC]'
                : 'bg-white text-[#6A89A7] border border-[#BDDFC] hover:bg-[#BDDFC]/30'
            }`}
          >
            Search Flights
          </button>
          <button
            onClick={onNavigateWatchlist}
            className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
              isDark
                ? 'bg-[#505081] text-[#88BDF2] hover:bg-[#8686AC]'
                : 'bg-white text-[#6A89A7] border border-[#BDDFC] hover:bg-[#BDDFC]/30'
            }`}
          >
            My Saved Flights
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm col-span-2 md:col-span-1 ${
              isDark
                ? 'bg-[#505081] text-[#88BDF2] hover:bg-[#8686AC]'
                : 'bg-white text-[#6A89A7] border border-[#BDDFC] hover:bg-[#BDDFC]/30'
            }`}
          >
            Help & Support
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className={`p-4 rounded-lg border ${isDark ? 'bg-[#3E2D5C] border-[#505081] text-[#8686AC]' : 'bg-[#BDDFC]/20 border-[#BDDFC]/40 text-[#6A89A7]'} text-sm`}>
        <p>[INFO] All flight data is for demonstration purposes. For actual bookings, please visit an authorized airline website.</p>
      </div>
    </div>
  )
}
