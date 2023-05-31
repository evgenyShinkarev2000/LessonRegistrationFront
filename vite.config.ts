import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsConfigPaths(),
  ],
  server: {
    port: 5050,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
              @import "./src/styles/container.scss";
              @import "./src/styles/card.scss";
              @import "./src/styles/flex.scss";
              @import "./src/styles/colors.scss";
      `,
      },
    }
  }
})
