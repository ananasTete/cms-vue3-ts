<template>
  <div class="main">
    <el-container class="main-content">
      <!--侧边栏-->
      <el-aside :width="isCollapse ? '60px' : '200px'">
        <nav-menu @changeFold="changeFold" />
      </el-aside>
      <!--主内容区-->
      <el-container class="page">
        <el-header class="page-header">
          <nav-header />
        </el-header>
        <el-main class="page-content">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { NavMenu } from '@/components/nav-menu/index'
import { NavHeader } from '@/components/nav-header/index'

export default defineComponent({
  components: { NavMenu, NavHeader },
  setup() {
    const isCollapse = ref(false)
    function changeFold(isFold: boolean) {
      isCollapse.value = isFold
    }
    return {
      changeFold,
      isCollapse
    }
  }
})
</script>

<style scoped lang="less">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.main-content,
.page {
  height: 100%;
}
.page-content {
  height: calc(100% - 48px);
}
.el-header {
  height: 48px !important;
}
.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  text-align: left;
  cursor: pointer;
  transition: width 0.3s linear; /*侧边栏收缩动画 */
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE10+ */
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
