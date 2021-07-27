import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页',
      keepAlive: true
    },
    component: () => import('./components/layout/layout.vue'),
    redirect: '/my-cart',
    children: [
      {
        path: '/my-cart',
        name: 'myCart',
        component: () => import('./pages/myCart.vue')
      }
    ]
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
