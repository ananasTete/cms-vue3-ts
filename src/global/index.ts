/** 封装全局配置 */

import { App } from 'vue'
import { registerElement } from './register-element'

export function register(app: App) {
  registerElement(app)
}
