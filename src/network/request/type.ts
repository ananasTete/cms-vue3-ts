import { AxiosRequestConfig, AxiosResponse } from 'axios'

// 拦截器接口
export interface Interceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

// 自定义请求配置接口，继承了axios的请求配置接口
export interface myRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: Interceptors<T>
  showLoading?: boolean
}

//实现myRequestConfig接口的对象，既要实现myRequestConfig接口也要实现AxiosRequestConfig接口
