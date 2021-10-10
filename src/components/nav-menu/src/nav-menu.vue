<template>
  <div class="nav-menu">
    <div class="logo" @click="handFoldClick">
      <img class="img" src="~@/assets/img/logo.svg" />
      <span class="title" v-show="!isFold">后台管理系统</span>
    </div>
    <el-menu
      :default-active="currentPageId"
      class="el-menu-vertical"
      :collapse="isFold"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="0a60bd"
      :unique-opened="isOpend"
    >
      <!--遍历数组中的每个对象-->
      <template v-for="item in userMenus" :key="item.id">
        <!--判断此对象type，为1时表示此对象是个二级菜单，还要遍历-->
        <template v-if="item.type === 1">
          <!--index作为唯一标识可以实现展开收起-->
          <el-submenu :index="item.id + ''">
            <!--二级菜单可以展开的标题-->
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <!--二级标题-->
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="menuItemClick(subItem)"
              >
                <i v-if="subItem.icon" :class="subItem.icon"></i>
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!--type为2时，表示此对象是个一级菜单-->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''" @click="menuItemClick(item)">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { myUseStore } from '@/store/index'
import { useRouter, useRoute } from 'vue-router'
import { mapPathToMenu } from '@/utils/map-menus'

export default defineComponent({
  emits: ['changeFold'],
  name: 'NavMenu',
  setup(props, { emit }) {
    //从vuex中获取请求到的菜单信息
    const store = myUseStore()
    const userMenus = computed(() => store.state.loginModule.userMenus)

    //记住密码，定义布尔值变量，点击时取反，并发射事件到父组件中
    const isFold = ref(false)
    function handFoldClick() {
      isFold.value = !isFold.value
      emit('changeFold', isFold.value)
    }

    //点击选项调转到对应对象中的路径
    const router = useRouter()
    function menuItemClick(item: any) {
      router.push({
        path: item.url ?? '/not-fount'
      })
    }

    //需要设置default-active用于设置菜单栏默认选中哪一项
    //获取当前页面的路径，调用封装函数获取userMenus中对应的对象，获取对象的id
    //绑定到default-active上，这样刷新页面后菜单栏还是选中刷新前的那一项，而不是固定的某一项
    const route = useRoute()
    const currentPath = route.path
    const menu = mapPathToMenu(userMenus.value, currentPath)
    const currentPageId = ref(menu.id + '')

    //菜单是否只能打开一栏
    const isOpend = true

    return {
      userMenus,
      isFold,
      handFoldClick,
      menuItemClick,
      currentPageId,
      isOpend
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  position: relative;
  height: 100%;
  background-color: #0c2135;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
  }

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    line-height: 28px;
    font-size: 16px;
    font-weight: 700;
    color: white;
    overflow: hidden;
  }
}
.el-menu {
  border-right: none;
}
.el-submenu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #001529 !important;
  }
}
.el-menu-item:hover {
  color: #fff !important;
}
.el-menu-item.is-active {
  color: #fff !important;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
