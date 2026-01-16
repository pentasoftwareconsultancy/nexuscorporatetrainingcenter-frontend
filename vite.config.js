import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    historyApiFallback: true,
  },
  base: "/",   // 👈 REQUIRED for Vercel SPA
  build: {
    outDir: "dist"
  },
})