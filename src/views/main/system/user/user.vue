<template>
  <div class="user">
    <!--1. search面板-->
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="resetClick"
      @queryBtnClick="queryClick"
    />

    <!--2. content面板-->
    <page-content
      ref="pageContentRef"
      :tableFormConfig="tableFormConfig"
      pageName="users"
      @updateBtnClick="handleUpdateClick"
      @createBtnClick="handleCreateClick"
    />

    <!--3. 新建按钮弹出的对话框-->
    <page-modal
      ref="pageModalRef"
      pageName="users"
      :modalFormConfig="modalFormConfigRef"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'
import { searchFormConfig } from './config/search.config'
import { tableFormConfig } from './config/list.config'
import { modalFormConfig } from './config/modal.config'
import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-pageModal'
import { myUseStore } from '@/store'

export default defineComponent({
  components: {
    PageSearch,
    PageModal
  },
  name: 'user',
  setup() {
    /**
     * 第一部分：page-search相关的事件函数
     * 重置按钮、搜索按钮调用pageContent的方法会在多个视图用到，所以封装起来
     */
    const [pageContentRef, resetClick, queryClick] = usePageSearch()

    /**
     * 第二部分：user视图单独的配置
     */
    //控制配置对象中密码表单显示隐藏的函数，点击创建按钮时调用此函数
    function createCallBack() {
      const passwordItem = modalFormConfig.formItem.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    function updateCallBack() {
      const passwordItem = modalFormConfig.formItem.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    //将请求到的部门、角色信息添加到配置数据modalFormConfig中，由于异步请求部门、角色时间不确定所以
    //将添加操作写到computed中，当vuex中的数据改变时再次赋值，使用此computed代替modalFormConfig
    //绑定到page-modal
    const store = myUseStore()
    const modalFormConfigRef = computed(() => {
      const departmentItem = modalFormConfig.formItem.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      const roleItem = modalFormConfig.formItem.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalFormConfig
    })

    /**
     * 第三部分：page-content相关的事件函数
     * 新建、编辑按钮事件
     */
    const [pageModalRef, defaultInfo, handleUpdateClick, handleCreateClick] =
      usePageModal(createCallBack, updateCallBack)

    return {
      searchFormConfig,
      tableFormConfig,
      modalFormConfigRef,
      pageContentRef,
      resetClick,
      queryClick,
      pageModalRef,
      defaultInfo,
      handleUpdateClick,
      handleCreateClick
    }
  }
})
</script>

<style scoped>
.user {
  height: 100%;
}
</style>
