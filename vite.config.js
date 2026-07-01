import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// styled-jsx (the <style jsx> blocks in App.jsx) is kept via its Babel plugin so
// the existing styles port unchanged. GitHub Pages serves under /Beadworks/.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/Beadwork-3-tech/' : '/',
  plugins: [react({ babel: { plugins: ['styled-jsx/babel'] } })],
  server: { port: 3000 },
  // a short build stamp shown in the UI so we can confirm which bundle is live
  // (iPad Safari caches hard — this tells us at a glance if a reload really landed)
  define: {
    __BUILD_ID__: JSON.stringify(
      new Date().toISOString().slice(5, 16).replace('T', ' ')
    ),
  },
}))
