import { App } from 'vue'

const modules = import.meta.globEager('./**/index.ts')
import './styles/base.scss'
import './styles/ui.scss'

export default {
  install(app: App) {
    Object.values(modules).forEach((value: any) => {
      app.use(value.default)
    })
  }
}