import { Module } from 'vuex'
import { RootStateType, loginStateType } from '../types'
import { userAccountType } from '@/network/login/types'
import {
  accountLoginRequest,
  userInfoRequestById,
  userMenuRequestByRoleId
} from '@/network/login/login'
import localCache from '@/utils/cache'
import router from '@/router/index'
import { mapMenusToRoutes, mapMenusToPermission } from '@/utils/map-menus'

const loginModule: Module<loginStateType, RootStateType> = {
  //(本模块state的类型，根模块state的类型)
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      //根据菜单中存在的路径获取route对象数组
      const routes = mapMenusToRoutes(userMenus)
      //遍历route对象数组，注册到router中
      routes.forEach((route) => {
        router.addRoute('main', route)
      })
      //从当前userMenus中取出按钮权限数组
      state.permissions = mapMenusToPermission(userMenus)
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: userAccountType) {
      // 1. 将账号密码向服务器验证并返回数据
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token) //缓存token

      // 2. 登陆后，由id请求用户信息
      const userInfoResult = await userInfoRequestById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo) //缓存用户信息

      // 3. 请求首页菜单数据
      const userMenusResult = await userMenuRequestByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus) //缓存首页菜单数据

      // 4. 跳转到首页
      router.push('/main')
    },

    mobileLoginAction() {
      // console.log(payload)
    },

    //刷新页面后会重新调用的action，由于刷新后会重新加载vue实例，vuex中保存的数据会消失，在这里
    //将locahe中保存的数据再赋给vuex中的数据。还分发了请求预请求信息的action
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token) {
        commit('changeToken', token)
        //预请求数据：部门、角色、权限信息
        dispatch('getInitiaDataAction', null, { root: true })
      }
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
