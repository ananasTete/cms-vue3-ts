<template>
  <div class="page-search">
    <my-form v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <div class="input-btn">
          <el-button icon="el-icon-refresh" @click="resetClick">重置</el-button>
          <el-button type="primary" icon="el-icon-search" @click="searchClick"
            >搜索</el-button
          >
        </div>
      </template>
    </my-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import myForm from '@/base-ui/myForm'

export default defineComponent({
  name: 'PageSearch',
  components: { myForm },
  props: {
    searchFormConfig: {
      type: Object,
      require: true
    }
  },
  emit: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    //定义一个空对象，把配置对象中配置表单的对象数组中每个对象的field属性值作为此空对象的属性，赋值为空字符串
    //获取此对象的ref对象与my-form表单中的数据做双向绑定
    const formOriginData: any = {}
    const formItems = props.searchFormConfig?.formItem ?? []
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)

    //重置按钮
    function resetClick() {
      formData.value = formOriginData
      emit('resetBtnClick')
    }
    //搜索按钮
    function searchClick() {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      resetClick,
      searchClick
    }
  }
})
</script>

<style scoped lang="less">
.page-search {
  margin-bottom: 20px;
}
.input-btn {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
