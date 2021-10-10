<template>
  <div class="page-modal">
    <el-dialog
      title=""
      v-model="DialogVisible"
      width="30%"
      center
      destroy-on-close
    >
      <my-form v-bind="modalFormConfig" v-model="formData"></my-form>
      <!--定义一个插槽-->
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="DialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { myUseStore } from '@/store'
import myForm from '@/base-ui/myForm'

export default defineComponent({
  components: {
    myForm
  },
  name: '',
  props: {
    modalFormConfig: {
      type: Object,
      require: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    }
  },
  setup(props) {
    //控制dialog显示隐藏的数据
    const DialogVisible = ref(false)

    //定义与表单双向绑定的数据
    const formData = ref<any>({})
    watch(
      () => props.defaultInfo,
      (newVal) => {
        for (const item of props.modalFormConfig?.formItem) {
          formData.value[`${item.field}`] = newVal[`${item.field}`]
        }
      }
    )

    const store = myUseStore()

    //确定按钮事件
    function handleConfirmClick() {
      DialogVisible.value = false
      //新建时点击确定和编辑时点击确定操作是不同的
      //点击创建按钮时props.defaultInfo传过来的是一个空对象，编辑按钮则是一个
      //包含了表单数据的对象，可以通过判断是否有数据判断是新建操作还是编辑操作
      if (Object.keys(props.defaultInfo).length) {
        //编辑
        console.log('编辑用户')
        store.dispatch('tableModule/updatePageDataAction', {
          pageName: props.pageName,
          updateData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        console.log('新建用户')
        console.log({ ...formData.value, ...props.otherInfo })
        store.dispatch('tableModule/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }

    return {
      DialogVisible,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style scoped lang="less"></style>
