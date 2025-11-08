import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import StoryViewer from '../views/StoryViewer.vue'
import Login from '../views/Login.vue'
import RegisterViewer from '@/views/RegisterViewer.vue'
import Profile from '@/views/Profile.vue'
import EditProfile from '@/views/EditProfile.vue'
import { useAuthStore } from '@/stores/authStore'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/story/:id', name: 'Story', component: StoryViewer, props: true },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: RegisterViewer },
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/profile/edit', name: 'EditProfile', component: EditProfile },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  const publicPages = ['/login', '/register']
  const requiresAuth = !publicPages.includes(to.path)

  if (!auth.currentUser) {
    await auth.fetchUserFromSession()
  }

  const userId = auth.currentUser?.id

  if (requiresAuth && !userId) {
    next('/login')
  } else if (userId && publicPages.includes(to.path)) {
    next('/')
  } else {
    next()
  }
})

export default router
