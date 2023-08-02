import { createRouter, createWebHistory } from 'vue-router'
import CoverCreation from '../views/CoverCreation.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'CoverCreation',
      component: CoverCreation
    }
  ]
})

export default router
