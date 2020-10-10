import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: require('@/components/pages/Main').default
    },
    {
      path: '/preferences',
      name: 'preferences',
      component: require('@/components/widgets/PopupPreferences').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
