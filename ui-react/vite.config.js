import { defineConfig } from 'vite'
import path from "path";
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // "@": resolve(__dirname, "src"),
      // "@": fileURLToPath(new URL('./src', import.meta.url))
      "@": path.resolve(__dirname, "src"),
    }
  },
  css:{	
		preprocessorOptions: {
			scss: {
        // charset: false,
        javascriptEnabled: true,
        additionalData: `
          @use "@/assets/style/mobile_base.scss" as *;
        `
        // @use"./src/assets/styles/mobile_base.scss";
        // '@import "@/assets/styles/mobile_base.scss";',
      },
		},
  },
})
