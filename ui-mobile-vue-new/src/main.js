import Vue from 'vue'
import App from './App.vue'
import store from '@/store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/iconfont_new/iconfont.css'
import '@/assets/iconfont_new/iconfont.js'

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  mixins: [],
  render: h => h(App),
  store,
}).$mount('#app')
