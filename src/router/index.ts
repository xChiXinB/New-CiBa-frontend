import { createRouter, createWebHistory } from 'vue-router'
import InputView from '../views/InputView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'input',
      component: InputView
    },
    {
      path: '/passage',
      name: 'passage',
      // 路由懒加载
      component: () => import('../views/PassageView.vue')
    },
  ]
})

export default router
