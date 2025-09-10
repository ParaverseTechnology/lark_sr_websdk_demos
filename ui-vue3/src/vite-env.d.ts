/// <reference types="vite/client" />
// 解决引入.vue模块的报错提示
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
// 解决引入.js模块的报错提示
declare module '*.js'
