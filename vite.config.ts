import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Pomodoro Timer',
        short_name: 'Pomodoro',
        description: 'Simple PWA Pomodoro Timer',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'pomodoro_timer@1x.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pomodoro_timer@2x.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  base: '/pomodoro/',
})
