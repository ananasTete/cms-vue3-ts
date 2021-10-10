import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('views/main/main.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('views/login/login.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: 'not-found',
    component: () => import('views/not-found/not-found.vue')
  }
]

const router = createRouter({ routes, history: createWebHashHistory() })

// 导航守卫
router.beforeEach((to) => {
  //只要目标路径不是/login,都做判断是否有token(即是否登录)没有则跳转到/login
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  //目标路径为main时，重定向到userMenus中的第一个路径
  if (to.path === '/main') {
    return firstMenu.url
  }
})
export default router
