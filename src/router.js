import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store/store'


import Home from '@/pages/Home/Home'
import Login from '@/pages/Login/Login'
import Sign from '@/pages/Sign/Sign'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requireAuth: true // 进入这个路由是否需要登录
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requireAuth: false // 进入这个路由是否需要登录
      }
    },
    {
      path: '/sign',
      name: 'sign',
      component: Sign,
      meta: {
        requireAuth: false // 进入这个路由是否需要登录
      }
    }, {
      path: '*',
      redirect: "/",
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (Store.state.token && Store.state.token == 0) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    } else next();
  } else {
    next();
  }
})

export default router;