import {createApp} from 'vue'

import store from './store'
import router from './router'

import {registerApp} from './global'
import App from './App.vue'

const app = createApp(App)
//全局注册
registerApp(app)
app.use(store)
app.use(router)
app.mount('#app')
