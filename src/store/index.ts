import { createStore, Store, useStore } from 'vuex'
import { RootStateType, StoreType } from './types'
import { getPageListData } from '@/network/main/system/system'

import loginModule from './login/login'
import tableModule from './main/dataTable'
import dashboardModule from './main/dashboard'

/**
 * 根模块
 */

const store = createStore<RootStateType>({
  //RootStateType：在ts中需要给模块的state声明类型
  state() {
    return {
      //将部门和角色保存到根模块中
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    //请求预请求信息的action，再login模块中调用
    async getInitiaDataAction({ commit }) {
      // 1. 请求完整的部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 100
      })
      const { list: department } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 100
      })
      const { list: role } = roleResult.data

      // 2. 请求完整的权限数据
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data

      // 保存到state
      commit('changeEntireDepartment', department)
      commit('changeEntireRole', role)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    loginModule,
    tableModule,
    dashboardModule
  }
})

// 定义函数分发检测是否登录的action
export function setupStore() {
  store.dispatch('loginModule/loadLocalLogin')
}

// 自定义函数包装useStore返回的store对象，给store对象指定类型后返回。解决vuex和ts的问题
export function myUseStore(): Store<StoreType> {
  return useStore()
}

export default store
