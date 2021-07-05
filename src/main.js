import Vue from 'vue'
import App from './App'
import Vuelidate from 'vuelidate'
import isLength from 'lodash/isLength'

import router from './router'
import store from './store'

import './assets/tailwind.css'

const isProd = process.env.NODE_ENV === 'production'

Object.defineProperty(Vue.prototype, '$isLength', { value: isLength })

Vue.config.devtools = isProd ? false : true
Vue.config.productionTip = isProd ? false : true
Vue.config.silent = isProd ? true : false
Vue.config.debug = isProd ? false : true

const isConsoleReady = isProd ? (console.log = () => {}) : ''

isConsoleReady

Vue.use(Vuelidate)

Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    },
})

new Vue({
    store,
    router,
    render: (h) => h(App),
}).$mount('#app')
