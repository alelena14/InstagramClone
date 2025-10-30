import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import StoryViewer from '../views/StoryViewer.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/story/:id', name: 'Story', component: StoryViewer, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
