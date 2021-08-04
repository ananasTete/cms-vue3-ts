/**
 * 封装login视图的网络请求
 */

import myRequest from '../index'
import { userAccountType, dataType } from './types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenus = '/role/'
}

// 将账号密码发送到服务器验证并返回数据的方法
export function accountLoginRequest(userAccount: userAccountType) {
  return myRequest.post<dataType>({
    url: LoginAPI.AccountLogin,
    data: userAccount,
    showLoading: true
  })
}

// 由id请求用户信息的方法
export function userInfoRequestById(id: number) {
  return myRequest.get<dataType>({
    url: LoginAPI.LoginUserInfo + id
  })
}

// 请求主页中菜单数据的方法
export function userMenuRequestByRoleId(id: number) {
  return myRequest.get<dataType>({
    url: LoginAPI.UserMenus + id + '/menu'
  })
}
