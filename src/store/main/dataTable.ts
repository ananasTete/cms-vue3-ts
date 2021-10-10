import { Module } from 'vuex'
import { RootStateType, tableStateType } from '@/store/types'
import {
  getPageListData,
  deletePageDataById,
  createPageData,
  updatePageData
} from '@/network/main/system/system'

const tableModule: Module<tableStateType, RootStateType> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  mutations: {
    //users
    changeUsersState(state, List: any[]) {
      state.usersList = List
    },
    changeUsersCount(state, Count: number) {
      state.usersCount = Count
    },
    //role
    changeRoleState(state, List: any[]) {
      state.roleList = List
    },
    changeRoleCount(state, Count: number) {
      state.roleCount = Count
    },
    //goods
    changeGoodsState(state, List: any[]) {
      state.goodsList = List
    },
    changeGoodsCount(state, Count: number) {
      state.goodsCount = Count
    },
    //menu
    changeMenuState(state, List: any[]) {
      state.menuList = List
    },
    changeMenuCount(state, Count: number) {
      state.menuCount = Count
    }
  },
  actions: {
    //根据表单向服务器请求数据的action
    async getPageListAction({ commit }, payload: any) {
      // 将pageName做字符串拼接
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`

      //发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      //将数据保存对应的state
      const { list, totalCount } = pageResult.data
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)

      commit(`change${changePageName}State`, list)
      commit(`change${changePageName}Count`, totalCount)
    },
    //删除数据的action
    async deletePageDataAction({ dispatch }, payload: any) {
      //拼接删除数据的地址(pageName+删除数据的id)
      const { pageName, id } = payload
      const url = `/${pageName}/${id}`
      //调用network中删除数据的方法,打印返回值看是否删除成功
      const message = await deletePageDataById(url)
      console.log(message)
      // 重新请求一下最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    //新建数据的action
    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload
      const url = `/${pageName}`
      await createPageData(url, newData)
      console.log(pageName, newData)
      // 重新请求一下最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    //编辑数据的action
    async updatePageDataAction({ dispatch }, payload: any) {
      const { pageName, id, updateData } = payload
      const url = `/${pageName}/${id}`
      await updatePageData(url, updateData)
      // 重新请求一下最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default tableModule
