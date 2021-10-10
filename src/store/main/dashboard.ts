import { Module } from 'vuex'
import { RootStateType, dashboardStateType } from '@/store/types'

import {
  getCategoryGoodsCount,
  getAddressGoodsSale,
  getCategoryGoodsFavor,
  getCategoryGoodsSale
} from '@/network/main/dashboard'

/**
 *  dashboard模块，用于保存echarts展示的数据
 */
const dashboardModule: Module<dashboardStateType, RootStateType> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategoryGoodsSale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryGoodsFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const countRsult = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', countRsult.data)

      const goodsSaleRsult = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', goodsSaleRsult.data)

      const favorRsult = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', favorRsult.data)

      const adressSaleRsult = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', adressSaleRsult.data)
    }
  }
}
export default dashboardModule
