/* eslint-disable */
declare module '*.vue' {
  //声明.vue类型,在ts文件中就可以导入vue文件了
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare let $store: any
