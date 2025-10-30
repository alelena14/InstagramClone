<template>
  <div class="pt-5.5">
    <div class="flex gap-4 border-b border-gray-700/50 pb-1 mb-3.5">
      <button class="font-semibold text-white pb-2">For you</button>
      <button class="font-semibold text-white pb-2">Followers</button>
    </div>

    <div class="flex space-x-4 overflow-x-auto whitespace-nowrap py-2">
      <div v-if="isLoading" class="flex items-center justify-center w-full h-16">
        <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        <span class="ml-3 text-white">Loading stories...</span>
      </div>

      <div v-else class="flex space-x-6 mx-3">
        <StoryItem
          v-for="story in stories"
          :key="story.id"
          :story-data="story"
          @click="goToStory(story.id)"
        />
        <p v-if="stories.length === 0" class="text-gray-500">No stories available.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import StoryItem from './StoryItem.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goToStory = (id) => {
  router.push(`/story/${id}`)
}

const stories = ref([])
const isLoading = ref(true)
const API_URL = 'http://localhost:3000/stories'

const fetchStories = async () => {
  isLoading.value = true
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    stories.value = data
  } catch (error) {
    console.error('Error fetching stories:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchStories()
  console.log('StoryNavbar mounted, fetching stories...')
})
</script>

<style scoped>
.overflow-x-auto::-webkit-scrollbar {
  display: none; /* Chrome/Safari */
}
.overflow-x-auto {
  -ms-overflow-style: none; /* IE and Edge */
}
</style>
