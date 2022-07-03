import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve:{
    alias:{
      '@':'/src/',      //格式一定要写对喽不然没有代码提示或者报错
    }
  }
})
