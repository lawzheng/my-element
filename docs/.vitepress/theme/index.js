import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import mUI from '@lawzz/my-element'
import '../../../node_modules/@lawzz/my-element/lib/style.css'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(ElementPlus)

    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(`el-icon-${key.replace(/(A-Z)g/, '-$1').toLowerCase()}`, component)
    }
    app.use(mUI)
  }
}