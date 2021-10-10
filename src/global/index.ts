/** 封装全局配置 */

import { App } from 'vue'
import { registerElement } from './register-element'
import { registerProperties } from './register-properties'
import { registerComponent } from './register-component'

export function register(app: App) {
  registerElement(app)
  registerProperties(app)
  registerComponent(app)
}
