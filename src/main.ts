import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import 'normalize.css'
import '@/assets/css/index.less'

import { register } from './global/index'
import { setupStore } from '@/store/index'

const app = createApp(App)
register(app)
app.use(store)
setupStore()
app.use(router) //顺序不能变，调用setupStore()方法要在注册router之前
app.mount('#app')
