<template>
  <div class="w-[250px] pl-4">
    <!-- 🔹 Current user info -->
    <div class="flex justify-between items-center mb-6">
      <div class="flex items-center">
        <img
          :src="currentUser?.profileImage || '../../ProfilePic.png'"
          alt="ProfilePic"
          class="w-12 h-12 rounded-full mr-3"
        />
        <div>
          <p class="font-semibold text-sm">{{ currentUser?.username }}</p>
          <p class="text-gray-400 text-sm">{{ currentUser?.fullName }}</p>
        </div>
      </div>
      <button
        class="text-blue-400 text-xs font-semibold cursor-pointer hover:text-blue-300 hover:underline hover:underline-offset-2"
      >
        Switch
      </button>
    </div>

    <!-- 🔹 Suggestions list -->
    <div class="flex justify-between items-center mb-3">
      <p class="text-gray-400 font-semibold text-sm">Suggestions for you</p>
      <button class="text-white text-xs font-semibold cursor-pointer hover:text-gray-400">
        See all
      </button>
    </div>

    <div class="w-[280px]">
      <div v-if="isLoading" class="flex justify-center items-center h-20">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>

      <div v-else>
        <div
          v-for="suggestion in suggestions"
          :key="suggestion.id"
          class="flex justify-between items-center mb-4"
        >
          <div class="flex items-center">
            <img :src="suggestion.img" alt="" class="w-12 h-12 rounded-full bg-gray-700 mr-3" />
            <div>
              <p class="font-semibold text-sm">{{ suggestion.user }}</p>
              <p class="text-gray-400 text-xs">{{ suggestion.motive }}</p>
            </div>
          </div>
          <button
            class="bg-[#4a5df9] text-white text-xs font-semibold py-2 px-6 rounded-md hover:bg-[#4150f7] cursor-pointer"
          >
            Follow
          </button>
        </div>
      </div>
    </div>

    <!-- 🔹 Footer -->
    <div class="mt-8 text-xs text-gray-500 space-x-1">
      <span>About</span> &middot; <span>Help</span> &middot; <span>API</span> &middot;
      <span>Jobs</span>
      <div class="mt-2">
        <span>Language: English</span> &middot;
        <span>© 2025 INSTAGRAM FROM META</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const currentUser = ref(null)
const suggestions = ref([])
const isLoading = ref(true)

const API_URL = 'http://localhost:3000/suggestions'
const USERS_URL = 'http://localhost:3000/users'

const fetchCurrentUser = async () => {
  try {
    const userId = sessionStorage.getItem('userId')
    if (!userId) {
      console.warn('No userId found in sessionStorage')
      return
    }

    const res = await fetch(`${USERS_URL}/${userId}`)
    if (!res.ok) throw new Error('Failed to fetch current user')

    currentUser.value = await res.json()
  } catch (err) {
    console.error('Error fetching current user:', err)
  }
}

const fetchSuggestions = async () => {
  isLoading.value = true
  try {
    const response = await fetch(API_URL)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    suggestions.value = await response.json()
  } catch (error) {
    console.error('Error fetching suggestions:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchCurrentUser()
  fetchSuggestions()
})
</script>
