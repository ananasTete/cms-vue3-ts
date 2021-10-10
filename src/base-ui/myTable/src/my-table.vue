<template>
  <div class="my-table">
    <!-- 1、header -->
    <div class="header">
      <!--在header部分添加插槽-->
      <slot name="header"> </slot>
    </div>

    <!-- 2、table -->
    <!--listDate:需要显示的数据, handleSelectionChange:选择框改变选中状态后触发的函数-->
    <!--childrenProps: 绑定多级表格的配置，需要多级表格时在配置数据中定义-->
    <el-table
      :data="listData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-bind="childrenProps"
    >
      <!-- 2.1 显示选择框的列，可以通过配置决定是否显示-->
      <el-table-column
        v-if="showColSelect"
        type="selection"
        align="center"
        width="50"
      >
      </el-table-column>
      <!-- 2.2 显示行号的列，可以通过配置决定是否显示-->
      <el-table-column
        v-if="showColIndex"
        type="index"
        label="序号"
        align="center"
        width="50"
      ></el-table-column>
      <!-- 2.3 遍历propList，形成数据的列-->
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <!--定义一个插槽，添加默认显示的内容-->
            <!--为每一列的元素设置插槽，并通过作用域插槽将默认数据传递到外面-->
            <!--需要改变格式显示时就传一个改变了格式的插槽到指定的插槽-->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>

    <!-- 3、footer的插槽,默认填充分页器 -->
    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { propListType } from './types'

export default defineComponent({
  name: 'MyTable',
  props: {
    listData: {
      type: Array,
      require: true
    },
    listCount: {
      type: Number,
      default: 0
    },
    propList: {
      type: Array as PropType<propListType[]>,
      require: true
    },
    showColIndex: {
      type: Boolean,
      default: false
    },
    showColSelect: {
      type: Boolean,
      default: false
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 1, pageSize: 10 })
    },
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    }
  },
  emit: ['update:page'],
  setup(props, { emit }) {
    function handleSelectionChange(value: any) {
      //value保存了选中行组成的对象数组value
      emit('selectionChange', value)
    }
    function handleSizeChange(pageSize: number) {
      emit('update:page', { ...props.page, pageSize })
    }
    function handleCurrentChange(currentPage: number) {
      emit('update:page', { ...props.page, currentPage })
    }
    return {
      handleSelectionChange,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 20px;
}
.footer {
  margin-top: 20px;
}
</style>
