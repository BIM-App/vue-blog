import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import BlogDetail from '../views/BlogDetail.vue'
import BlogEdit from '../views/BlogEdit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    // 路由重定向
    redirect: {
      name: 'Login'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/blogs',
    name: 'Blogs',
    // 路由懒加载
    component: () => import('../views/Blogs.vue')
  },
  {
    path: '/blog/add',
    name: 'BlogAdd',
    meta: {
      requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
    },
    component: BlogEdit
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
      path: '/blog/:blogId/edit',
      name: 'BlogEdit',
      meta: {
      requireAuth: true
    },
    component: BlogEdit
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
