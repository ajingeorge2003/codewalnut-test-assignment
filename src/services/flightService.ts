export type ApiFlight = any

// 🔒 API LOCKED - DO NOT MODIFY THIS SECTION
// The API endpoint is working and verified.
// Configuration is loaded from environment variables (.env file)
const BASE = import.meta.env.VITE_API_BASE_URL || 'https://flight-explorer-api.codewalnut.com/api'
const TIMEOUT = import.meta.env.VITE_API_TIMEOUT ? parseInt(import.meta.env.VITE_API_TIMEOUT) : 10000
const DEBUG = true // set to false to disable debug logs

/**
 * fetchFlights - fetches flights from API with detailed error handling.
 * DO NOT MODIFY the fetch logic or error handling without testing.
 * API is locked and working correctly.
 */
export async function fetchFlights(): Promise<{ flights: ApiFlight[] }> {
  try {
    if (DEBUG) console.log('📡 Fetching flights from:', `${BASE}/flights`)
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT) // configurable timeout
    
    const res = await fetch(`${BASE}/flights`, {
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    clearTimeout(timeoutId)
    
    if (!res.ok) {
      throw new Error(`API returned ${res.status}: ${res.statusText}`)
    }
    
    const data = await res.json()
    if (DEBUG) console.log('✅ API Success:', data)
    return data
    
  } catch (err: any) {
    const errMsg = err?.message || 'Unknown error'
    console.error('❌ API ERROR:', errMsg)
    throw err // Re-throw to prevent fallback
  }
}
