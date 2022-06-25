import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
    alias:{
      '@':'/src/',      //格式一定要写对喽不然没有代码提示或者报错
    }
  }
})
