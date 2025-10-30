<template>
  <div
    class="relative bg-[#1a1a1a] min-h-screen text-white flex items-center justify-center overflow-hidden"
  >
    <div v-if="isLoading" class="flex flex-col items-center justify-center w-full h-screen">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      <span class="mt-3 text-white text-sm">Loading stories...</span>
    </div>

    <div
      v-else
      class="relative w-full flex justify-center items-center transition-all duration-500 ease-in-out"
    >
      <button
        v-if="currentStoryIndex > 0"
        @click="prevStory"
        class="absolute left-1/3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/30 text-gray-900 z-30"
      >
        <font-awesome-icon :icon="['fas', 'chevron-left']" class="text-sm" />
      </button>

      <button
        v-if="currentStoryIndex < stories.length - 1"
        @click="nextStory"
        class="absolute right-1/3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/30 text-gray-900 z-30"
      >
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-sm" />
      </button>

      <div class="relative flex items-center justify-center w-full h-[96vh] overflow-hidden">
        <div
          v-for="(story, index) in stories"
          :key="story.id"
          class="absolute transition-all duration-700 ease-in-out cursor-pointer"
          :style="setStoryStyle(index)"
          @click="setCurrentStory(index)"
        >
          <StoryReel
            :story-data="story"
            :is-active="index === currentStoryIndex"
            :next-story="nextStory"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import StoryReel from '@/components/StoryReel.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const stories = ref([])
const isLoading = ref(true)
const currentStoryIndex = ref(router.currentRoute.value.params.id - 1)
const API_URL = 'http://localhost:3000/stories'

const fetchStories = async () => {
  isLoading.value = true
  try {
    const response = await fetch(API_URL)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    stories.value = await response.json()
  } catch (error) {
    console.error('Error fetching stories:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchStories()
  console.log(router.currentRoute.value.params.id)
})

const setCurrentStory = (index) => {
  currentStoryIndex.value = index
}

const nextStory = () => {
  if (currentStoryIndex.value < stories.value.length - 1) {
    currentStoryIndex.value++
  } else router.push('/')
}

const prevStory = () => {
  if (currentStoryIndex.value > 0) {
    currentStoryIndex.value--
  }
}

const setStoryStyle = (index) => {
  const isCurrent = index - currentStoryIndex.value
  const scale = isCurrent === 0 ? 1 : 0.75
  const opacity = isCurrent === 0 ? 1 : 0.5
  const translateX = isCurrent * 420

  return {
    transform: `translateX(${translateX}px) scale(${scale})`,
    zIndex: 20 - Math.abs(isCurrent),
    opacity,
  }
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
