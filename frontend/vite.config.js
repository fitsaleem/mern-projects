import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server :{
    build: {
      outDir: 'public',
      // other build options...
   },
    proxy: {
      '/api' :{
        target: 'http://localhost:3000',
        secure : false,
      },
    },
  },
  plugins: [react()],
})
