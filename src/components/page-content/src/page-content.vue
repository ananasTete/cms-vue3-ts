<template>
  <div class="page-content">
    <my-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="tableFormConfig"
      v-model:page="pageInfo"
    >
      <!-- 1. header的插槽内容,添加了创建和删除按钮-->
      <template #header>
        <el-button
          icon="el-icon-circle-plus"
          type="primary"
          size="mini"
          v-if="isCreate"
          @click="handleCreateClick"
          >新建</el-button
        >
        <el-button icon="el-icon-delete" type="danger" size="mini"
          >删除</el-button
        >
      </template>

      <!-- 2. 列中的插槽内容-->
      <!-- 2.1 有些内容不想以原格式展示但新格式在所有父组件中通用，直接定义在page-content中-->
      <template #status="scope">
        <el-button
          plain
          size="mini"
          :type="scope.row.enable ? 'primary' : 'danger'"
          >{{ scope.row.enable ? '可用状态' : '禁用状态' }}</el-button
        >
      </template>
      <template #createAt="scope">
        {{ $filters.utcFormatTime(scope.row.createAt) }}
      </template>
      <template #updateAt="scope">
        {{ $filters.utcFormatTime(scope.row.updateAt) }}
      </template>
      <!--编辑框插槽内容-->
      <template #handler="scope">
        <el-button
          icon="el-icon-edit"
          type="text"
          v-if="isUpdate"
          @click="handleUpdateClick(scope.row)"
          >编辑</el-button
        >
        <span class="deleteEditbtn">
          <el-button
            icon="el-icon-delete"
            type="text"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
        </span>
      </template>
      <!-- 2.2 固定插槽内容外的插槽内容-->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>

      <!-- 3. footer的插槽内容-->
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </my-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { myUseStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'
import MyTable from '@/base-ui/myTable'

export default defineComponent({
  components: {
    MyTable
  },
  name: 'PageContent',
  props: {
    tableFormConfig: {
      type: Object,
      require: true
    },
    pageName: {
      type: String,
      require: true
    }
  },
  emit: ['createBtnClick', 'updateBtnClick'],
  setup(props, { emit }) {
    const store = myUseStore()
    /**
     * 第一部分：获取该用户的page-content中的按钮权限
     */
    const isCreate = usePermission(props.pageName, 'create')
    const isDelete = usePermission(props.pageName, 'delete')
    const isUpdate = usePermission(props.pageName, 'update')
    const isQuery = usePermission(props.pageName, 'query')

    /**
     * 第二部分：请求数据并保存到vuex
     */
    //定义pageInfo与my-table中的分页器配置双向绑定，会影响到数据请求的queryInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    //当my-table中的分页器配置发生改变时，重新请求数据
    watch(pageInfo, () => {
      //将配置信息保存到vuex
      store.commit('tableModule/changeRequestConf', {
        offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
        size: pageInfo.value.pageSize
      })
      getPageData()
    })

    //请求全部数据

    function getPageData(otherQueryInfo: any = {}) {
      if (!isQuery) return //没有查询权限就退出函数不发送请求
      store.dispatch('tableModule/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...otherQueryInfo
        }
      })
      //本次请求从数据的第offset条之后开始请求，请求size条数据
    }
    getPageData() //进入页面时默认查询所有数据，再点击搜索和重置按钮进行查询

    /**
     * 第三部分：从vuex获取请求到的数据
     */
    //导入表单配置数据，从vuex拿到请求到的数据通过prop传给组件
    const dataList = computed(() =>
      store.getters[`tableModule/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`tableModule/pageListCount`](props.pageName)
    )

    /**
     * 第四部分：获取配置数据的对象数组中除了固定插槽对应对象以外的对象组成的数组
     */
    const otherPropSlots = props.tableFormConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    /**
     * 第五部分：page-content中的删除、编辑、新建操作
     */
    function handleDeleteClick(item: any) {
      store.dispatch('tableModule/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }
    function handleUpdateClick(item: any) {
      emit('updateBtnClick', item)
    }

    function handleCreateClick() {
      emit('createBtnClick')
    }

    return {
      dataList,
      dataCount,
      getPageData,
      pageInfo,
      otherPropSlots,
      isDelete,
      isUpdate,
      isCreate,
      handleUpdateClick,
      handleDeleteClick,
      handleCreateClick
    }
  }
})
</script>

<style scoped lang="less">
.deleteEditbtn {
  margin-left: 5px;
}
.deleteEditbtn :hover {
  color: red;
}
.page-content {
  background-color: #fff;
  padding: 20px;
}
</style>
