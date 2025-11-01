import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/dream-travel-map/', // 🆕 ZMIEŃ "dream-travel-map" na NAZWĘ TWOJEGO REPO!
})