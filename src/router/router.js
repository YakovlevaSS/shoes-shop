import { createWebHistory, createRouter } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import FavoritesPage from '../pages/FavoritesPage.vue'
import SneakersPage from '@/pages/sneakersPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import AddNewPage from '@/pages/AddNewPage.vue'

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/favorites', name: 'Favorites', component: FavoritesPage },
  { path: '/profile', name: 'Profile', component: ProfilePage },
  { path: '/sneaker/:id', name: 'Sneaker', component: SneakersPage }, 
  { path: '/add-new', name: 'AddNew', component: AddNewPage }, 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router