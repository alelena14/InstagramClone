<template>
  <div
    class="relative w-[400px] h-[96vh] flex rounded-lg flex-shrink-0 bg-center bg-no-repeat bg-cover"
    :style="{ backgroundImage: `url(${storyData.storyURL})` }"
  >
    <div
      class="z-0 absolute top-0 left-0 right-0 h-1/6 bg-gradient-to-b from-black/50 to-transparent"
    ></div>

    <div
      class="z-0 absolute bottom-0 left-0 right-0 h-1/6 bg-gradient-to-t from-black/50 to-transparent"
    ></div>

    <div class="z-1 absolute top-2 left-2 right-2 pt-2 flex gap-2">
      <div class="flex-1 h-0.5 bg-gray-400 rounded overflow-hidden">
        <div
          class="h-full bg-white transition-all duration-100"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
    </div>

    <div class="z-1 pt-2 flex flex-col">
      <div class="flex space-x-2 p-4">
        <img
          :src="storyData.img"
          alt="story image"
          class="w-8 h-8 rounded-full p-0.5 object-full mb-4"
        />
        <p class="mt-0.5">{{ storyData.user }}</p>
      </div>
    </div>

    <div class="z-1 flex space-x-2 items-center absolute bottom-4 left-4 right-4 justify-between">
      <p class="w-[280px] border border-white rounded-4xl p-3">Reply to {{ storyData.user }}</p>
      <font-awesome-icon :icon="['far', 'heart']" class="cursor-pointer hover:text-gray-400" />
      <font-awesome-icon
        :icon="['far', 'paper-plane']"
        class="cursor-pointer hover:text-gray-400"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted, watch } from 'vue'

const props = defineProps({
  storyData: Object,
  isActive: Boolean,
  nextStory: Function,
})

const progress = ref(0)
let timer = null

function startProgress() {
  clearInterval(timer)
  progress.value = 0
  timer = setInterval(() => {
    progress.value += 2
    if (progress.value >= 100) {
      clearInterval(timer)
      props.nextStory()
    }
  }, 100)
}

function stopProgress() {
  clearInterval(timer)
  progress.value = 0
}

function viewStory() {
  const API_URL = 'http://localhost:3000/stories'
  fetch(`${API_URL}/${props.storyData.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ viewed: true }),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      console.error('Error viewing story:', error)
    })
}

// urmareste schimbarea prop ului isActive
watch(
  () => props.isActive,
  (newVal) => {
    viewStory()
    if (newVal) {
      startProgress()
    } else stopProgress()
  },
)

onMounted(() => {
  if (props.isActive) {
    startProgress()
    viewStory()
  }
})

onBeforeUnmount(() => clearInterval(timer))
</script>

<style scoped>
.progress {
  transition: width 0.1s linear;
}
</style>
