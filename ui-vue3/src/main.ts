import { createApp, type Directive } from 'vue'
import App from './App.vue'
// import { store } from './store/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import '@/assets/css/common.scss'
// import '@/assets/iconfont/iconfont.js'
// import '@/assets/iconfont/iconfont.css' 
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as directives from './directives'
// import './assets/styles/mobile_base.scss'
import pinia from './stores/index.js'

import '@/assets/iconfont_new/iconfont.css'
import '@/assets/iconfont_new/iconfont.js';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'



const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

Object.keys(directives).forEach(key => {  //Object.keys() 返回一个数组，值是所有可遍历属性的key名
  app.directive(key, (directives as { [key: string ]: Directive })[key])  //key是自定义指令名字；后面应该是自定义指令的值，值类型是string
})
// .use(store)
app.use(pinia).use(ElementPlus, {size: 'large',locale: zhCn,})
app.mount('#app');