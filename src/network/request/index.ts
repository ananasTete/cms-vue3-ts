import axios from 'axios'
import type { AxiosInstance } from 'axios'
import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
import { Interceptors, myRequestConfig } from './type'

//定义封装网络请求的类，创建实例即创建一个axios实例
class myRequest {
  instance: AxiosInstance
  interceptors?: Interceptors
  loadingInstance?: ILoadingInstance
  showLoading?: boolean

  constructor(config: myRequestConfig) {
    this.instance = axios.create(config) //每次调用new myRequest()都会创建一个单独的axios对象

    this.showLoading = false

    //定义每个axios实例自己的拦截器
    this.interceptors = config.interceptors //拿到传进来的参数中的拦截器对象
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    //定义每个axios实例都需要的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        //添加loading
        if (this.showLoading) {
          this.loadingInstance = ElLoading.service({
            lock: true,
            text: '数据加载中',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        //取消loading
        this.loadingInstance?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败~, 错误信息')
        } else {
          return data
        }
      },
      (err) => {
        // 将loading移除
        this.loadingInstance?.close()

        if (err.response.status === 404) {
          console.log('404的错误~')
        }
        return err
      }
    )
  }

  request<T = any>(config: myRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showLoading === true) {
        this.showLoading = true
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
            //res改为了T类型，但在类型声明中还是AxiosResponse，需要将T传到类型声明中
          }
          this.showLoading = false
          resolve(res)
          //这里的request方法返回的res是AxiosResponse<any>类型,和T类型有冲突
          //在request函数的第二个泛型可以指定res的类型
        })
        .catch((err) => {
          this.showLoading = false
          reject(err)
          return err
        })
    })
  }

  //定义四种不同的请求模式去调用request方法,这样实例根据请求类型直接调用对应的方法即可，不需要在config指定类型
  get<T = any>(config: myRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: myRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: myRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: myRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default myRequest
