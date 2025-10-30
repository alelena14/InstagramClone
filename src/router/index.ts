import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import StoryViewer from '../views/StoryViewer.vue'
import Login from '../views/Login.vue'
import Register from '@/views/RegisterViewer.vue'
import RegisterViewer from '@/views/RegisterViewer.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/story/:id', name: 'Story', component: StoryViewer, props: true },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: RegisterViewer },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
