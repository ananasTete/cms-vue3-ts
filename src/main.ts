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
app.use(router).use(store).mount('#app')
setupStore()
