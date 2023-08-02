import { createRouter, createWebHistory } from 'vue-router'
import CoverCreation from '../views/CoverCreation.vue'
import Lyrics from '../views/Lyrics.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'CoverCreation',
      component: CoverCreation
    },
    {
      path: '/Lyrics',
      name: 'Lyrics',
      component: Lyrics
    }
  ]
})

export default router
