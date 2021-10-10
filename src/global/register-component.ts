/**
 * 封装全局组件
 */
import { App } from 'vue'
import PageContent from '@/components/page-content'

export function registerComponent(app: App) {
  app.component('page-content', PageContent)
}
