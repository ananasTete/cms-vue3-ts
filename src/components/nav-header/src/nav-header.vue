<template>
  <div class="nav-header">
    <!--左-->
    <div class="">
      <my-breadcrumb :breadcrumbs="breadcrumbs" />
    </div>
    <!--右-->
    <div class="header-right">
      <!--用户信息下拉栏-->
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>用户信息</el-dropdown-item>
            <el-dropdown-item
              icon="el-icon-switch-button"
              divided
              @click="handleQuitClick"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import myBreadcrumb from '@/base-ui/breadcrumb/index'
import { mapPathToBread } from '@/utils/map-menus'
import localCache from '@/utils/cache'

export default defineComponent({
  components: {
    myBreadcrumb
  },
  name: 'NavHeader',
  setup() {
    //获取面包屑数据：对象数组
    const store = useStore()

    const breadcrumbs = computed(() => {
      const userMenus = store.state.loginModule.userMenus
      const route = useRoute()
      const currentPath = route.path
      return mapPathToBread(userMenus, currentPath)
    })

    //获取用户名
    const userName = computed(() => store.state.loginModule.userInfo.name)

    //退出登录按钮事件
    const router = useRouter()
    function handleQuitClick() {
      //删除token
      localCache.deleteCache('token')
      //跳转到main页面，在导航守卫中做了判断，如果目标是main没有token会跳转到登录视图
      router.push('/main')
    }

    return {
      breadcrumbs,
      userName,
      handleQuitClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header-right {
  cursor: pointer;
}
</style>
