import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void

export function usePageModal(createCb?: CallbackFn, updateCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})

  //编辑按钮函数
  function handleUpdateClick(item: any) {
    //将编辑按钮所在行的对象传给defaultInfo,再由defaultInfo通过props传给page-modal中的数据
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      //显示弹出框
      pageModalRef.value.DialogVisible = true
    }
    //当调用usePageModal时传入了updateCb时会调用
    updateCb && updateCb(item)
  }
  //创建按钮函数
  function handleCreateClick() {
    defaultInfo.value = {} //清空page-modal中与表单双向绑定的数据的值
    if (pageModalRef.value) {
      pageModalRef.value.DialogVisible = true
    }
    //当调用usePageModal时传入了createCb时会调用
    createCb && createCb()
  }
  //将定义的数据和函数返回
  return [pageModalRef, defaultInfo, handleUpdateClick, handleCreateClick]
}
