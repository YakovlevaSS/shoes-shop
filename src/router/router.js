import { createWebHistory, createRouter } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import FavoritesPage from '../pages/FavoritesPage.vue'
import SneakersPage from '@/pages/sneakersPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/favorites', name: 'Favorites', component: FavoritesPage },
  { path: '/profile', name: 'Profile', component: ProfilePage },
  { path: '/sneaker/:id', name: 'Sneaker', component: SneakersPage }, 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router