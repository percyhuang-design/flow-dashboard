import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base is set to './' so the build works on GitHub Pages from any sub-path
export default defineConfig({
  plugins: [react()],
  base: './',
})
