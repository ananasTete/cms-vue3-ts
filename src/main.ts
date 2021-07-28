import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import { register } from './global/index'

const app = createApp(App)

register(app)

app.use(router).use(store).mount('#app')
