<template>
  <div class="role">
    <!--1. search面板-->
    <page-search :searchFormConfig="searchFormConfig" />

    <!--2. content面板-->
    <page-content
      :tableFormConfig="tableFormConfig"
      pageName="role"
      @updateBtnClick="handleUpdateClick"
      @createBtnClick="handleCreateClick"
    />

    <!--3. 新建按钮弹出的对话框-->
    <page-modal
      ref="pageModalRef"
      pageName="role"
      :modalFormConfig="modalFormConfig"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <div class="menu">
        <el-tree
          ref="elTreeRef"
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        >
        </el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'
import { ElTree } from 'element-plus'
import { tableFormConfig } from './config/list.config'
import { searchFormConfig } from './config/search.config'
import { modalFormConfig } from './config/modal.config'
import { usePageModal } from '@/hooks/use-pageModal'
import { myUseStore } from '@/store'
import { getMenuLeafKeys } from '@/utils/map-menus'

export default defineComponent({
  components: {
    PageSearch,
    PageModal
  },
  name: 'role',
  setup() {
    const store = myUseStore()

    //本页面中编辑按钮的回调函数函数
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    function updateCallBack(item: any) {
      //取出所编辑对象中保存权限的menuList对象数组中最底层对象的id组成的数组
      //对象的menuList中只保存了选中的权限对应的对象，所以就是获取选中权限对象中最底层对象的id
      const leafKeys = getMenuLeafKeys(item.menuList)
      nextTick(() => {
        //将最底层对象的id设置到el-tree中，el-tree中的这些权限就会被选中
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }

    // 1. page-content按钮事件
    const [pageModalRef, defaultInfo, handleUpdateClick, handleCreateClick] =
      usePageModal(undefined, updateCallBack)

    // 2. 获取完整的权限列表，传给el-tree
    const menus = computed(() => store.state.entireMenu)

    // 3. 获取el-tree中选择的权限信息
    const otherInfo = ref({})
    function handleCheckChange(data1: any, data2: any) {
      //data1中保存了所选的对象，
      //data2：checkedKeys所有所选对象的node-key的值（这里设置了id）组成的数组，halfCheckedKeys：所有所选对象及其子/父对象的id组成的数组
      //checkedNodes:所选对象组成的数组，halfCheckedNodes：所有所选对象及其子/父对象组成的数组
      const checkedKeys = data2.checkedKeys
      const halfCheckKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckKeys]
      //将选中节点的Id组成的数组添加到otherInfo中
      otherInfo.value = { menuList }
    }

    return {
      tableFormConfig,
      searchFormConfig,
      modalFormConfig,
      pageModalRef,
      defaultInfo,
      handleUpdateClick,
      handleCreateClick,
      menus,
      handleCheckChange,
      otherInfo,
      elTreeRef
    }
  }
})
</script>

<style scoped>
.menu {
  margin-left: 70px;
}
</style>
