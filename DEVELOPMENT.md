# 🚀 Flight Explorer - Development Guide

## Project Overview

**Flight Explorer** is a modern web application built with **React 18**, **TypeScript**, **Vite**, and **Tailwind CSS** for searching, viewing, and tracking flights.

### Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Framework |
| TypeScript | 5.1.6 | Type Safety |
| Vite | 5.4.21 | Build Tool |
| Tailwind CSS | 4.1.16 | Styling |
| Vitest | 1.6.1 | Testing |
| react-icons | 5.0.1 | Icons |

## Project Structure

```
src/
├── components/
│   ├── SearchForm.tsx       # Flight search interface
│   ├── FlightCard.tsx       # Flight display card with animations
│   └── FlightDetails.tsx    # Detailed flight information
├── pages/
│   ├── Home.tsx            # Main search & results page
│   └── WatchlistPage.tsx   # Saved flights page
├── context/
│   └── WatchlistContext.tsx # Global watchlist state + localStorage
├── services/
│   └── flightService.ts    # API integration (LOCKED)
├── tests/
│   ├── setup.ts
│   ├── SearchForm.test.tsx
│   ├── Watchlist.test.tsx
│   └── FlightCard.test.tsx
├── App.tsx                 # Main app with navigation
├── main.tsx               # Entry point
├── main.css               # Global styles + animations
└── vite-env.d.ts         # Vite types
```

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```
- Starts on `http://localhost:5173` (or next available port)
- Hot Module Replacement (HMR) enabled
- Live reload on file changes

### Production Build

```bash
npm run build
```
- Output: `dist/` directory
- Optimized bundle (~52KB gzipped)
- CSS: ~5.3KB gzipped

### Testing

```bash
npm run test
```
- Runs Vitest in watch mode
- Tests for SearchForm, Watchlist, FlightCard

## API Integration

### Endpoint
```
https://flight-explorer-api.codewalnut.com/api/flights
```

### Features
- ✅ 10-second timeout protection
- ✅ Abort controller for cancellation
- ✅ Debug logging (`📡`, `✅`, `❌` emojis)
- ✅ Error handling with user-friendly messages
- 🔒 **LOCKED** - No modifications allowed

### Usage Example
```typescript
import { fetchFlights } from './services/flightService'

// In component
const { results, loading, error } = await fetchFlights()
```

## Component API Reference

### SearchForm
```tsx
<SearchForm 
  onSearch={(params) => {
    // params: { origin?, destination?, flightNumber? }
  }}
/>
```

### FlightCard
```tsx
<FlightCard 
  flight={flight}
  onSelect={(flight) => {}}
  onToggleWatch={(flight) => {}}
  isWatched={boolean}
/>
```

### FlightDetails
```tsx
<FlightDetails flight={flight} />
```

## State Management

### WatchlistContext
```typescript
const { watchlist, add, remove, toggle } = useWatchlist()

// watchlist: Flight[]
// add(flight: Flight): void
// remove(id: string): void
// toggle(flight: Flight): void
```

### Data Persistence
- Key: `flight_explorer_watchlist_v1`
- Storage: browser localStorage
- Auto-syncs on changes

## Styling Guide

### Tailwind Configuration
- Custom container (max-width: 5xl)
- Dark mode support (prefers-color-scheme)
- Custom animations in `main.css`

### Custom Animations
```css
.animate-fade-in        /* fadeInUp: 0.3s ease-out */
.animate-pulse         /* shimmer: 2s infinite */
.animate-fade-in-fast  /* fadeIn: 0.15s ease-out */
```

### Color System
- Primary: `#2563eb` (blue)
- Success: `#16a34a` (green)
- Warning: `#eab308` (yellow)
- Danger: `#dc2626` (red)
- Neutral: Gray scale 50-900

## Design Patterns

### Card Layout
```tsx
<div className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 border">
  {/* Content with 3-column grid for flights */}
</div>
```

### Status Indicators
- Green badge: On Time
- Yellow badge: Delayed
- Red badge: Cancelled
- Icons included (FaCheckCircle, FaExclamationCircle, FaTimesCircle)

### Empty/Loading States
```tsx
// Loading
{loading && <div className="animate-pulse h-48 rounded-lg bg-gray-200" />}

// Empty
{results.length === 0 && <div className="text-center text-gray-500">No results</div>}

// Error
{error && <div className="p-4 bg-red-50 rounded-lg text-red-800">{error}</div>}
```

## Performance Optimization

### Bundle Size
- JavaScript: ~52KB (gzipped)
- CSS: ~5.3KB (gzipped)
- Total: ~57KB

### Optimization Techniques
- Code splitting (automatic via Vite)
- CSS purging (Tailwind)
- Dynamic imports for plugins
- Tree-shaking enabled

### Animation Performance
- Uses `transform` and `opacity` (GPU accelerated)
- No expensive layout recalculations
- Smooth 60fps animations

## Testing Strategy

### Unit Tests
```bash
npm run test
```

### Test Coverage
- SearchForm validation
- Watchlist persistence
- FlightCard rendering
- useWatchlist hook

### Test Patterns
```typescript
describe('Component', () => {
  it('should render', () => {
    // Test implementation
  })
})
```

## Common Issues & Solutions

### Issue: Build fails with Tailwind v4
**Solution**: Ensure `@tailwindcss/postcss` is installed and `@import "tailwindcss"` is in main.css

### Issue: Vite ESM plugin error
**Solution**: Using dynamic import in vite.config.ts

### Issue: API returns no data
**Debug**: Check browser console for API logs (`📡`, `✅`, `❌`)

### Issue: Dark mode not working
**Solution**: Ensure `prefers-color-scheme` is supported or add `dark:` classes

## Development Workflow

### Adding a New Component
1. Create in `src/components/`
2. Add TypeScript types
3. Add unit tests in `src/tests/`
4. Import and use in pages/components
5. Test with `npm run dev`

### Modifying Styles
1. Edit Tailwind classes directly in JSX
2. For custom CSS, add to `src/main.css`
3. Follow existing color/spacing patterns
4. Test dark mode compatibility

### API Changes
🔒 **DO NOT MODIFY** `src/services/flightService.ts` - it is LOCKED

If API needs updating:
1. Document required changes
2. Update tests
3. Notify team lead
4. Do not commit changes to locked file

## Deployment

### Build for Production
```bash
npm run build
```

### Serve Locally
```bash
npm run preview
```

### Deploy to Hosting
Upload `dist/` directory to your hosting service

### Environment Variables
Currently using hardcoded API endpoint. To make configurable:
```typescript
const API_BASE = import.meta.env.VITE_API_BASE || 'https://...'
```

## Debugging

### Enable Verbose Logging
Already included in FlightCard, Home, and flightService

### Browser DevTools
- Console: API logs and errors
- Elements: Inspect styling
- Network: Monitor API calls
- Application: Check localStorage

### React DevTools
- Install React Developer Tools extension
- Inspect component props and state
- Track context changes

## Contributing Guidelines

1. Follow TypeScript best practices
2. Use descriptive component names
3. Add JSDoc comments for complex logic
4. Test before committing
5. Follow existing code patterns

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)
- [Vitest Guide](https://vitest.dev)

---

**Last Updated**: December 2024  
**Status**: ✅ Production Ready
