import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'landing-page',
    //   component: require('@/components/LandingPage').default
    // },
    {
      path: '/',
      component: require('../layouts/task').default,
      redirect: '/allTodo',
      meta: { auth: true },
      children: [
        {
          path: '/allTodo',
          name: 'all-to-do',
          component: require('../layouts/allTodo').default
        },
        {
          path: '/addToDo',
          name: 'add-to-do',
          component: require('../layouts/addToDo').default,
          meta: { auth: true }
        },
        {
          path: '/allDone',
          name: 'all-done',
          component: require('../layouts/allDone').default,
          meta: { auth: true }
        },
        {
          path: '/allDelete',
          name: 'all-delete',
          component: require('../layouts/allDelete').default,
          meta: { auth: true }
        },
        {
          path: '/todayToDo',
          name: 'today-to-do',
          component: require('../layouts/todayToDo').default,
          meta: { auth: true }
        },
        {
          path: '/sevenDayToDo',
          name: 'seven-day-to-do',
          component: require('../layouts/sevenDayToDo').default,
          meta: { auth: true }
        },
        {
          path: '/setting',
          name: 'setting',
          component: require('../layouts/setting').default,
          meta: { auth: true }
        },

        // {
        //   path: '/task',
        //   name: 'task',
        //   component: require('../layouts/task').default,
        // },
      ]
    },
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: require('../layouts/login').default,
    },
  ]
})
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.auth)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.

//     if (store.state.login.loginState === false) {
//       console.log("不可以登录")
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     } else {
//       next()
//     }
//   } else {
//     next() // 确保一定要调用 next()
//   }
// })
export default router;