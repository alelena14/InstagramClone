<template>
  <teleport to="body">
    <div class="fixed inset-0 bg-black/60 z-30" @click="$emit('close')">
      <button
        class="absolute text-4xl top-2 right-4 text-white text-2xl cursor-pointer"
        @click="$emit('close')"
      >
        &times;
      </button>
    </div>
    <div
      class="fixed top-[50vh] -translate-y-[50%] left-[50vw] -translate-x-[50%] bg-black/70 flex justify-center items-center z-40"
    >
      <div class="bg-[#212328] w-[530px] h-[560px] rounded-3xl overflow-hidden relative">
        <!-- STEP 1: SELECT FILE -->
        <div v-if="step === 'select'" class="flex flex-col items-center justify-center h-[580px]">
          <div
            class="absolute top-0 left-0 w-full text-center bg-black border-b border-[#363636] py-3 font-semibold text-white"
          >
            Create new post
          </div>

          <img src="../../createNewPost1.png" alt="" class="w-24 h-auto pb-2" />
          <p class="text-white text-xl mb-4.5">Drag photos and videos here</p>

          <label
            for="fileInput"
            class="bg-[#4a5df9] hover:bg-[#4253e6] text-white text-sm font-medium px-4 py-1.5 rounded-lg cursor-pointer"
          >
            Select from computer
          </label>

          <input
            id="fileInput"
            type="file"
            class="hidden"
            accept="image/*"
            @change="onFileSelected"
          />
        </div>

        <!-- STEP 2: CROP -->
        <div v-if="step === 'crop'" class="flex flex-col h-full">
          <div
            class="w-full text-center bg-black border-b border-[#363636] py-2 font-semibold text-white items-center justify-between flex"
          >
            <button class="text-2xl pl-4 cursor-pointer" @click="goToSelect()">
              <svg
                class="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span>Crop</span>
            <button class="text-blue-300 font-medium text-sm pr-4">Next</button>
          </div>

          <div class="flex-1 bg-black flex justify-center items-center">
            <img :src="previewImg" class="w-full h-full object-cover" />
          </div>

          <div
            class="absolute right-4 bottom-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/70 cursor-pointer hover:bg-black/50"
          >
            <img src="../../crop1.png" alt="" class="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const step = ref('select')
const previewImg = ref('')

const onFileSelected = (e) => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    previewImg.value = reader.result
    step.value = 'crop'
  }
  reader.readAsDataURL(file)
}

const goToSelect = () => {
  step.value = 'select'
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onBeforeUnmount(() => {
  document.body.style.overflow = 'auto'
  document.body.style.overflowX = 'hidden'
})
</script>
