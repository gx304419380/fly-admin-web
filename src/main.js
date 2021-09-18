import Vue from 'vue'
// A modern alternative to CSS resets
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// global css
import '@/styles/index.scss'
import App from './App'
import store from './store'
import router from './router'
// icon
import '@/icons'
// permission control
import '@/permission'
import { registerMicroApps, start } from 'qiankun'
import { getMicroApps } from '@/api/microApp'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

// 从后台获取所有注册的微前端
getMicroApps().then(res => {
  const apps = res.data
  registerMicroApps(apps)
  start({ prefetch: false })
})
