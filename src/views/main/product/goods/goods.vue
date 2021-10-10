<template>
  <div class="goods">
    <page-content :tableFormConfig="tableFormConfig" pageName="goods">
      <template #img="scope">
        <el-image
          style="weight: 90px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        ></el-image>
      </template>
      <template #oldPrice="scope">{{ '￥' + scope.row.oldPrice }}</template>
      <template #newPrice="scope">{{ '￥' + scope.row.newPrice }}</template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { tableFormConfig } from './config/list.config'

export default defineComponent({
  name: 'goods',
  setup() {
    return {
      tableFormConfig
    }
  }
})
</script>

<style scoped></style>
