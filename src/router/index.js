import { createRouter, createWebHistory } from 'vue-router'
import { auth } from "../firebase/index"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/cadastrar',
      name: 'cadastrar',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/acai/:acai',
      name: 'acai',
      component: () => import('../views/AcaiView.vue')
    },
    {
      path: '/carrinho',
      name: 'carrinho',
      component: () => import('../views/CartView.vue')
    },
    {
      path: '/pedidos',
      name: 'pedidos',
      component: () => import('../views/MyOrdersView.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/pedido/:pedido',
      name: 'pedido',
      component: () => import('../views/OrderView.vue'),
      meta: {
        auth: true
      }
    }
  ]
})

router.beforeEach((to, from ,next) => {
  if (to.path === "/login" && auth.currentUser) {
    next("/")
  } else if (to.matched.some((record) => record.meta.auth) && !auth.currentUser) {
    next("/login")
  } else{
    next()
  }
})

export default router
