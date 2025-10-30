<template>
  <div class="flex flex-col items-center flex-shrink-0 cursor-pointer w-20">
    <div
      :class="[
        'w-20 h-20 rounded-full p-0.5',
        storyData.viewed ? 'border-3 border-gray-700/80' : 'story-gradient',
      ]"
    >
      <div class="w-full h-full rounded-full overflow-hidden border-2 border-black">
        <img :src="storyData.img" alt="Story" class="object-cover w-full h-full" />
      </div>
    </div>

    <p class="text-xs mt-1 truncate w-full text-center">{{ storyData.user }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  storyData: Object,
})
</script>

<style scoped>
.story-gradient {
  background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 60%, #d6249f 80%);
  border-radius: 50%;
  padding: 3px;
}
</style>
