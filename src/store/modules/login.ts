import { Module } from 'vuex'
import { RootState, loginState } from '../types'
import { userAccountType } from '@/network/login/types'
import {
  accountLoginRequest,
  userInfoRequestById,
  userMenuRequestByRoleId
} from '@/network/login/login'
import localCache from '@/utils/cache'
import router from '@/router/index'

const loginModule: Module<loginState, RootState> = {
  namespaced: true,
  //(本模块state的类型，根模块state的类型)
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
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
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: userAccountType) {
      // 1. 将账号密码向服务器验证并返回数据
      const loginResult = await accountLoginRequest(payload)
      console.log(loginResult)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token) //缓存token
      // 2. 登陆后，由id请求用户信息
      const userInfoResult = await userInfoRequestById(id)
      console.log(userInfoResult)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo) //缓存用户信息
      // 3. 请求首页菜单数据
      const userMenusResult = await userMenuRequestByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      console.log(userMenus)
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus) //缓存首页菜单数据
      // 4. 跳转到首页
      router.push('/main')
    },
    mobileLoginAction({ commit }, payload: any) {
      console.log(payload)
    },
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token) {
        commit('changeToken', token)
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
