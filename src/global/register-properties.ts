/**
 * 封装全局属性
 */

import { App } from 'vue'
import { utcFormat, timestampFormat } from '@/utils/data-format'

export function registerProperties(app: App) {
  //定义全局属性--过滤器
  app.config.globalProperties.$filters = {
    //定义utc格式的时间转换函数
    utcFormatTime(originalTime: string) {
      return utcFormat(originalTime)
    },
    //定义时间戳格式的时间转换函数
    stampFormatTime(originalTime: number) {
      return timestampFormat(originalTime)
    }
  }
}
