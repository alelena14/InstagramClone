<template>
  <div class="space-y-4">
    <div v-if="isLoading" class="flex justify-center items-center h-40">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>

    <div v-else class="mt-4">
      <PostCard v-for="post in posts" :key="post.id" :post-data="post" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PostCard from './PostCard.vue'

const posts = ref([])
const isLoading = ref(true)
const API_URL = 'http://localhost:3000/posts'

const fetchPosts = async () => {
  isLoading.value = true
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    posts.value = data
  } catch (error) {
    console.error('Error fetching posts:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchPosts()
})
</script>
