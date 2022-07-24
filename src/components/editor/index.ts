import { App } from 'vue'
import editor from './src/index.vue'

export default {
  install(app: App) {
    app.component('MEditor', editor)
  }
}