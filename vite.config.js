import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Para GitHub Pages: usa el nombre EXACTO del repositorio (case-sensitive) como base.
  // Para Capacitor/Android usa el script 'static-build' (base: './').
  base: '/OUIJA-DRINKING-GAME/',
})