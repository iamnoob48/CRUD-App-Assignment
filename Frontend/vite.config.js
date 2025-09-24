import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  server : {
    proxy : {
      "/auth" : "http://localhost:3000",
      "/todo" : "http://localhost:3000",
      "/analyse" : "http://localhost:3000",
      "/api" : "http://localhost:3000"
    }
  },
  plugins: [tailwindcss(),react()],
  resolve: {
    alias: {
        "@": path.resolve(__dirname, "./"),
      },
  },
})
