# Flight Explorer Starter — Complete Setup & Project Status

## Overview
This is a **complete, working starter project** for the Flight Explorer assignment. All core components are in place, build passes, and the dev server works with no console errors.

**Status**: ✅ **READY TO EXTEND** — All infrastructure is working; you can now add features and expand tests.

## What's Included
- ✅ Vite + React 18 + TypeScript config (fully working)
- ✅ Tailwind CSS v4 integration (fixed and tested)
- ✅ Core components: SearchForm, FlightCard, FlightDetails
- ✅ Pages: Home (search + results), WatchlistPage
- ✅ WatchlistContext with localStorage persistence
- ✅ flightService with API wrapper + mock fallback
- ✅ 3 Vitest test suites (SearchForm, Watchlist, FlightCard)
- ✅ Production build: succeeds, ~152 KB JS + 12.6 KB CSS
- ✅ Dev server: runs with HMR, no console errors

## Quick Start

### 0. Setup environment variables
```powershell
# Copy the example to create your local .env file
Copy-Item .env.example .env
```

### 1. Install dependencies
```powershell
npm install
```

### 2. Start dev server
```powershell
npm run dev
```
Opens at `http://localhost:5173`

### 3. Run tests
```powershell
npm run test
```
Or in run mode:
```powershell
npm run test -- --run
```

### 4. Build for production
```powershell
npm run build
```
Output in `dist/` folder.

---

## Environment Variables

The project uses environment variables for configuration. These are loaded from `.env` file.

### Configuration Options

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `https://flight-explorer-api.codewalnut.com/api` | API endpoint base URL |
| `VITE_API_TIMEOUT` | `10000` | API request timeout in milliseconds |
| `VITE_APP_ENV` | `development` | Application environment (development/staging/production) |

### Setup

1. **Copy example file**:
   ```powershell
   Copy-Item .env.example .env
   ```

2. **Never commit `.env`** — it's in `.gitignore`
3. **Share `.env.example`** for team reference
4. **Override values** as needed for your setup

---

## Issues Fixed ✅

### 1. Tailwind CSS v4 Compatibility
**Problem**: Build failed — old PostCSS config didn't work with Tailwind v4.  
**Solution**: 
- Installed `@tailwindcss/postcss` package
- Updated `postcss.config.cjs` to reference new plugin
- Changed `src/main.css` from `@tailwind` directives to `@import "tailwindcss"`
- Result: ✅ Build now succeeds

### 2. Vite ESM Plugin Loading  
**Problem**: esbuild couldn't load `@vitejs/plugin-react` as ESM.  
**Solution**: Modified `vite.config.ts` to dynamically import the React plugin.  
**Result**: ✅ Config loads without errors

### 3. TypeScript Module Resolution
**Problem**: Editor showed false "Cannot find module './App'" errors.  
**Solution**: Full `npm install` ensures all dependencies and types are available.  
**Result**: ✅ All imports resolve correctly

---

## Project Structure
```
src/
├── main.tsx                    # React entry point
├── main.css                    # Tailwind CSS v4
├── App.tsx                     # Top-level layout
├── components/
│   ├── SearchForm.tsx          # Search validation
│   ├── FlightCard.tsx          # Status color-coding
│   └── FlightDetails.tsx       # Details view (expandable)
├── pages/
│   ├── Home.tsx                # Search + results
│   └── WatchlistPage.tsx       # Watchlist display
├── context/
│   └── WatchlistContext.tsx    # localStorage persistence
├── services/
│   └── flightService.ts        # API + fallback mock
└── tests/
    ├── setup.ts
    ├── SearchForm.test.tsx
    ├── Watchlist.test.tsx
    └── FlightCard.test.tsx
```

---

## What to Implement Next

### High Priority
1. **Enhance FlightDetails.tsx** — Add terminals, gates, delay info
2. **Improve responsive layout** — Mobile-first grid, better spacing
3. **Add more tests** — Test localStorage, API mocking, edge cases
4. **Verify API** — Test real endpoint (https://flight-explorer-api.codewalnut.com/api/flights)

### Medium Priority (Bonus)
1. **Airport autocomplete** (+5 marks)
2. **Advanced filters** (by airline, status, time) (+3 marks)
3. **Dark mode** (+5 marks)
4. **Animations** (skeletons, transitions) (+4 marks)

### Low Priority
- Add react-router for multi-page navigation
- Server-side search (if API supports query params)
- PWA features (offline support)

---

## Build Status

### ✅ Production Build Successful
```
✓ 43 modules transformed
dist/index.html                   0.42 kB │ gzip: 0.28 kB
dist/assets/index-DnVNwl-V.css   12.61 kB │ gzip: 3.22 kB
dist/assets/index-DePIS8Dg.js   152.22 kB │ gzip: 49.03 kB
✓ built in 3.60s
```

### ✅ Dev Server Working
- Runs at `localhost:5173`
- Hot Module Replacement enabled
- No console errors or warnings

### ✅ Tests Ready
- 3 test suites configured
- Vitest + Testing Library
- jsdom environment

---

## Deployment Options

### Vercel (Recommended)
1. Push to GitHub
2. Import repo in Vercel
3. Auto-deploys on push

### Netlify
1. Run `npm run build`
2. Drag `dist/` to Netlify
3. Done!

### GitHub Pages
1. Add `base: "/repo-name/"` to `vite.config.ts`
2. Run `npm run build`
3. Deploy `dist/` to gh-pages branch

---

## Troubleshooting

**Q: Build fails with ESM error**  
A: Already fixed. If persists, ensure Node v18+

**Q: Tailwind styles not showing**  
A: Check that `src/main.css` is imported in `src/main.tsx`

**Q: Port 5173 in use**  
A: Run `npm run dev -- --port 3000`

**Q: Tests timeout**  
A: First run can be slow. Try `npm run test -- --run`

---

## Commit Message Format

Follow conventional commits:
- `feat: add airport autocomplete`
- `fix: correct status badge colors`
- `test: add watchlist persistence tests`
- `style: improve flight card layout`
- `refactor: extract search logic to hook`
- `docs: update README with setup`

---

## Key Statistics

- **Node version**: v22.17.1 ✅
- **npm version**: 10.9.2 ✅
- **TypeScript**: v5.1.6
- **React**: 18.2.0
- **Vite**: 5.4.21
- **Tailwind**: 4.1.16
- **Vitest**: 1.6.1

---

## Ready to Build! 🚀

All infrastructure is set up and tested. You can now:
1. Run the dev server and see the UI
2. Add features to each component
3. Expand tests for full coverage
4. Deploy when ready

Start with: `npm run dev`

Good luck with the assignment!

2. Start dev server:

```powershell
npm run dev
```

3. Run tests:

```powershell
npm run test
```

Notes & next steps:
- Install dependencies from package.json before running.
- The UI is intentionally minimal; expand components and styles.
- Replace client-side filtering with API queries if endpoint supports parameters.
- Add more tests and accessibility checks.

This README complements the assignment README provided in the repo root.
