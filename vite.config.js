import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// styled-jsx (the <style jsx> blocks in App.jsx) is kept via its Babel plugin so
// the existing styles port unchanged. GitHub Pages serves under /Beadworks/.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/Beadwork-3-tech/' : '/',
  plugins: [react({ babel: { plugins: ['styled-jsx/babel'] } })],
  server: { port: 3000 },
}))
