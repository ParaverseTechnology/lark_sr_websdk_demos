import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import AutoImport from 'unplugin-auto-import/vite' 
 
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({//注册
    imports:['vue'],
    dts:'src/auto-import.d.ts'
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    }
  },
  css:{	
		preprocessorOptions: {
			scss: {
        charset: false,
        additionalData: '@import "@/assets/styles/mobile_base.scss";',
      },
		},
  },
  server: {
    host: '0.0.0.0',
    port: 8000,
    hmr: true
  },
  build: {
    minify: 'terser',
    // 清除所有console和debugger
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js', // 引入文件名的名称
        entryFileNames: 'js/[name]-[hash].js', // 包的入口文件名称
        assetFileNames: '[ext]/[name]-[hash].[ext]', // 资源文件像 字体，图片等
        // 最小化拆分包 node_modules的包逐个打包 将需要分离的包单独的打包出来
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
})