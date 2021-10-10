<template>
  <div id="app">
    <el-config-provider :locale="zhCn">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

export default defineComponent({
  component: {
    ElConfigProvider
  },
  name: 'App',
  setup() {
    return { zhCn }
  }
})
</script>

<style scoped lang="less">
#app {
  width: 100%;
  height: 100%;
}
</style>
