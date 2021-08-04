import { createStore } from 'vuex'
import { RootState } from './types'
import loginModule from './modules/login'

//在ts中需要给模块的state声明类型

const store = createStore<RootState>({
  //给state声明类型
  state() {
    return {
      name: 'admin'
    }
  },
  modules: {
    loginModule
  }
})

export function setupStore() {
  store.dispatch('loginModule/loadLocalLogin')
}

export default store
