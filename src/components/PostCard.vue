<template>
  <div class="bg-black max-w-lg mx-16 mb-10">
    <!-- Post Header -->
    <div class="flex items-center justify-between p-4">
      <div class="flex items-center">
        <img
          :src="postData.userAvatar"
          alt="Avatar"
          class="w-8 h-8 rounded-full object-cover mr-3 cursor-pointer"
        />
        <div>
          <p class="font-semibold text-sm cursor-pointer hover:underline">{{ postData.user }}</p>
          <p v-if="postData.location" class="text-xs text-gray-400">{{ postData.location }}</p>
        </div>
      </div>
      <font-awesome-icon :icon="['fas', 'ellipsis-h']" class="text-gray-400 cursor-pointer" />
    </div>

    <!-- Post Media -->
    <div class="relative w-full aspect-square bg-gray-800">
      <img
        :src="postData.mediaUrls[currentImageIndex]"
        alt="Post media"
        class="w-full h-full object-cover"
        loading="lazy"
      />

      <template v-if="postData.mediaUrls.length > 1">
        <button
          v-if="currentImageIndex > 0"
          @click="prevImage"
          class="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/30 text-gray-900"
        >
          <font-awesome-icon :icon="['fas', 'chevron-left']" class="text-sm" />
        </button>

        <button
          v-if="currentImageIndex < postData.mediaUrls.length - 1"
          @click="nextImage"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/30 text-gray-900"
        >
          <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-sm" />
        </button>

        <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-1">
          <span
            v-for="(url, index) in postData.mediaUrls"
            :key="index"
            :class="index === currentImageIndex ? 'bg-white' : 'bg-gray-500'"
            class="block w-1.5 h-1.5 rounded-full"
          ></span>
        </div>
      </template>
    </div>

    <!-- Post Actions and Caption -->
    <div class="p-4">
      <div class="flex justify-between items-center mb-2">
        <div class="flex space-x-4 text-2xl">
          <div class="flex justify-center items-center space-x-1">
            <font-awesome-icon
              :icon="['far', 'heart']"
              class="cursor-pointer hover:text-gray-400"
            />
            <span class="font-semibold text-sm">{{ postData.likes.toLocaleString() }}</span>
          </div>

          <div class="flex justify-center items-center space-x-1">
            <font-awesome-icon
              :icon="['far', 'comment']"
              class="cursor-pointer hover:text-gray-400"
            />
            <span class="text-sm font-semibold">{{ postData.commentsCount }} </span>
          </div>

          <font-awesome-icon
            :icon="['far', 'paper-plane']"
            class="cursor-pointer hover:text-gray-400"
          />
        </div>
        <font-awesome-icon
          :icon="['far', 'bookmark']"
          class="text-2xl cursor-pointer hover:text-gray-400"
        />
      </div>

      <p class="text-sm">
        <span class="font-semibold mr-1 cursor-pointer">{{ postData.user }}</span>
        {{ postData.caption.substring(0, 100) }}
      </p>

      <p class="text-xs text-gray-500 mt-2">5 DAYS AGO</p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  postData: Object,
})

const currentImageIndex = ref(0)

const nextImage = () => {
  if (currentImageIndex.value < props.postData.mediaUrls.length - 1) {
    currentImageIndex.value++
  }
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}
</script>

<style scoped></style>
