import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { toLine } from './utils'
import mUI from '@lawzz/my-element'
import '../node_modules/@lawzz/my-element/lib/style.css'
// import mUI from './components/index'
import './mock'
// import chooseIcon from '@lawzz/my-element/lib/chooseIcon'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(`el-icon-${toLine(key)}`, component)
}

app
.use(router)
.use(ElementPlus)
.use(mUI)
app.mount('#app')
