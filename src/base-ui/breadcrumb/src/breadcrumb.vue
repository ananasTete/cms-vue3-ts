<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item>{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { breadsumbType } from './types'

export default defineComponent({
  name: 'breadcrumb',
  props: {
    breadcrumbs: {
      type: Array as PropType<breadsumbType[]>,
      default: () => []
    }
  }
})
</script>

<style scoped lang="less"></style>
