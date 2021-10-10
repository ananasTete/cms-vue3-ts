<template>
  <div class="menu">
    <page-content
      :tableFormConfig="tableFormConfig"
      pageName="menu"
    ></page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { tableFormConfig } from './config/list.config'

export default defineComponent({
  name: 'menu',
  setup() {
    return {
      tableFormConfig
    }
  }
})
</script>

<style scoped></style>
