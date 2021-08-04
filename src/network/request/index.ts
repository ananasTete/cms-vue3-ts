import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'
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
        //添加token

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

  request<T>(config: myRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      if (config.showLoading === true) {
        this.showLoading = true
      }
      this.instance
        .request<any, T>(config)
        //request方法返回的res是AxiosResponse<any>类型,不是T在request函数的第二个泛型可以指定res的类型
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res) //res是T类型但这个拦截器函数接收的还是AxiosResponse类型，所以暂时先改掉它的声明
          }
          this.showLoading = false
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = false
          reject(err)
        })
    })
  }

  //判断一下本次调用中是否传入了interceptors拦截器对象及requestInter()方法，
  //传入了则先调用此拦截器函数传入config拦截一次，将拦截后返回的config再通过axios实例发送请求。
  //同理，在请求后，如果传入的实参中有interceptors拦截器对象及responseInterceptor()方法，
  //先对请求结果进行拦截。将拦截后返回请求结果再做处理。

  //定义四种不同的请求模式,去调用request方法
  get<T>(config: myRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: myRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: myRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: myRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default myRequest
