<template>
  <el-card class="my-card">
    <!--header插槽内容-->
    <template #header>
      <div class="card-header">
        <span>{{ title }}</span>
      </div>
    </template>

    <!--默认插槽内容-->
    <div class="item">
      <slot></slot>
    </div>
  </el-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: '',
  props: {
    title: {
      type: String,
      default: 'Title'
    }
  }
})
</script>

<style scoped lang="less">
.my-card {
  &:deep(.el-card__header) {
    padding: 10px 20px !important;
  }
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
}
.item {
  margin-bottom: 10px;
}
</style>
