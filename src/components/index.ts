import { App } from 'vue'

const modules = import.meta.globEager('./**/index.ts')

export default {
  install(app: App) {
    Object.values(modules).forEach((value: any) => {
      app.use(value.default)
    })
  }
}