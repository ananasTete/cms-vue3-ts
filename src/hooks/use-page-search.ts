/**
 * 点击pageSearch的按钮后，通过共同的父组件调用pageContent的方法请求数据展示。
 * 但会有多个父组件如user.vue、role.vue等都需要这样的操作，且操作逻辑完全相同，
 * 所以将操作封装成函数，可以在多个父组件调用。
 */

import { ref } from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch(): any {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()
  function resetClick() {
    pageContentRef.value?.getPageData()
  }
  function queryClick(otherQueryInfo: any) {
    pageContentRef.value?.getPageData(otherQueryInfo)
  }
  return [pageContentRef, resetClick, queryClick]
}
