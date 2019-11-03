import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'landing-page',
    //   component: require('@/components/LandingPage').default
    // },
    {
      path: '/foo',
      name: 'foo',
      component: require('@/components/LandingPage/SystemInformation').default
    },
    {
      path: '/',
      name: 'all-to-do',
      component: require('../layouts/allTodo').default
    },
    {
      path: '/addToDo',
      name: 'add-to-do',
      component: require('../layouts/addToDo').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
