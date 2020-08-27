import Vue from 'vue'
import App from './App'

import router from './router'
import store from './store'

import './assets/tailwind.css'

const isProd = process.env.NODE_ENV === 'production'

Vue.config.devtools      = isProd ? false : true
Vue.config.productionTip = isProd ? false : true
Vue.config.silent        = isProd ? true : false
Vue.config.debug         = isProd ? false : true

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
