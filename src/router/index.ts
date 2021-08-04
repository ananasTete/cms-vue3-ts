import { createRouter, createWebHashHistory } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/main',
    component: () => import('views/main/main.vue')
  },
  {
    path: '/login',
    component: () => import('views/login/login.vue')
  }
]

const router = createRouter({ routes, history: createWebHashHistory() })

// 导航守卫，只要目标路径不是/login,都做判断是否有token(即是否登录)没有则跳转到/login
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})
export default router
