import { defineConfig } from 'vite'

// https://vitejs.dev/config/
// Use dynamic import for ESM-only plugin to avoid esbuild require issue
export default defineConfig({
  plugins: [
    (async () => {
      const { default: react } = await import('@vitejs/plugin-react')
      return react()
    })() as any,
  ],
})
