import { defineStore } from 'pinia'

interface User {
  id: number
  username: string
  fullName: string
  email?: string
  phone?: string
  password: string
  birthday?: string
  profilePicture: string
  bio?: string
  gender?: string
  showThreads?: boolean
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    currentUser: null as User | null,
  }),

  getters: {
    isAuthenticated: (state) => {
      if (state.currentUser) {
        return true
      } else {
        return false
      }
    },
  },

  actions: {
    setUser(user: User) {
      this.currentUser = user
      sessionStorage.setItem('userId', String(user.id))
    },

    clearUser() {
      this.currentUser = null
      sessionStorage.removeItem('userId')
    },

    async fetchUserFromSession() {
      const id = sessionStorage.getItem('userId')
      if (id) {
        try {
          const res = await fetch(`http://localhost:3000/users/${id}`)
          if (!res.ok) throw new Error(`User not found (id: ${id})`)
          const data: User = await res.json()
          this.currentUser = data
        } catch (err) {
          console.error('Failed to fetch user:', err)
          this.clearUser()
        }
      }
    },
  },
})
