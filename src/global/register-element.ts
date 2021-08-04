/** 用于导入需要在多个组件中使用的element-plus组件，并注册为全局组件。 */

import { App } from 'vue'
import 'element-plus/lib/theme-chalk/base.css'
import {
  ElButton,
  ElTable,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElCheckbox,
  ElLink
} from 'element-plus'
const components = [
  ElButton,
  ElTable,
  ElTabs,
  ElTabPane,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElCheckbox,
  ElLink
]

export function registerElement(app: App) {
  components.forEach((cpn) => {
    app.component(cpn.name, cpn)
  })
}
