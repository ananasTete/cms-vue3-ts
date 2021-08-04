/**
 * 封装各模块中state的类型
 */

// 给根模块中state声明类型
interface RootState {
  name: string
}

// 给login模块中state声明类型
interface loginState {
  userMenus: any
  token: string
  userInfo: any
}

export { RootState, loginState }
