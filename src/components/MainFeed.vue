<template>
  <div class="space-y-4">
    <div v-if="isLoading" class="flex justify-center items-center h-40">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
    </div>

    <div v-else class="mt-4">
      <PostCard v-for="post in posts" :key="post.id" :post-data="post" />
    </div>

    <!-- Trigger pentru Intersection Observer -->
    <div ref="loadMoreTrigger" class="h-10"></div>

    <div v-if="isLoadingMore" class="flex justify-center items-center py-6">
      <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import PostCard from './PostCard.vue'

const posts = ref([])
const isLoading = ref(true)
const isLoadingMore = ref(false)

const page = ref(1)
const limit = 10
const hasMore = ref(true)

const loadMoreTrigger = ref(null)
let observer = null

const API_URL = 'http://localhost:3000/posts'

const fetchPosts = async () => {
  try {
    const response = await fetch(
      `${API_URL}?_sort=-createdAt&_page=${page.value}&_per_page=${limit}`,
    )

    const data = await response.json()

    if (data.data.length < limit) {
      hasMore.value = false
    }

    posts.value.push(...data.data)
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
}

const loadMore = async () => {
  if (isLoadingMore.value || !hasMore.value) return

  isLoadingMore.value = true
  page.value += 1

  await fetchPosts()

  isLoadingMore.value = false
}

onMounted(async () => {
  await fetchPosts()
  isLoading.value = false

  // setup IntersectionObserver
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMore()
    }
  })

  if (loadMoreTrigger.value) {
    observer.observe(loadMoreTrigger.value)
  }
})

onBeforeUnmount(() => {
  if (observer && loadMoreTrigger.value) {
    observer.unobserve(loadMoreTrigger.value)
  }
})
</script>
