/**
 * 网络封装总出口
 */

import myRequest from './request/index'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

export default new myRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,

  interceptors: {
    //每个axios实例都可以有自己的拦截器（可传可不传）
    requestInterceptor: (config) => {
      //在每次请求之前都将token添加到config中才能获得请求权限，token登录请求返回数据获得，将其添加到缓存就可以在这里拿
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})
