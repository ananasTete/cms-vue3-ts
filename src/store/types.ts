/**
 * 封装各模块中state的类型
 */

// 给根模块中state声明类型
interface RootStateType {
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

// 给login模块中state声明类型
interface loginStateType {
  userMenus: any
  token: string
  userInfo: any
  permissions: string[]
}

//给dataTable模块中state声明类型
interface tableStateType {
  usersList: any[]
  usersCount: number
  roleList: any[]
  roleCount: number
  goodsList: any[]
  goodsCount: number
  menuList: any[]
  menuCount: number
}

//给dashboard模块中state声明类型
interface dashboardStateType {
  categoryGoodsCount: any[]
  categoryGoodsSale: any[]
  categoryGoodsFavor: any[]
  addressGoodsSale: any[]
}

// 定义store的类型
interface RootWithModule {
  loginModule: loginStateType
  tableModule: tableStateType
  dashboardModule: dashboardStateType
}
type StoreType = RootStateType & RootWithModule //合并

export {
  StoreType,
  RootStateType,
  loginStateType,
  tableStateType,
  dashboardStateType
}
