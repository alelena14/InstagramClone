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
      class="fixed top-[50vh] -translate-y-[50%] left-[50vw] -translate-x-[50%] rounded-3xl bg-black/70 flex justify-center items-center z-40"
    >
      <div class="bg-[#212328] rounded-3xl overflow-hidden relative">
        <!-- STEP 1: SELECT FILE -->
        <div
          v-if="step === 'select'"
          class="flex flex-col w-[530px] h-[560px] items-center justify-center h-[580px]"
        >
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
        <div v-if="step === 'crop'" class="flex flex-col w-[530px] h-[560px]">
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
            <button class="text-blue-300 font-medium text-sm pr-4" @click="goToCreate()">
              Next
            </button>
          </div>

          <div class="flex-1 bg-black flex justify-center items-center">
            <img :src="previewImg" class="w-full h-full object-cover" />
          </div>

          <!-- Add New Photo -->
          <div
            v-if="addingNewPhoto"
            class="flex absolute max-w-[500px] bottom-16 right-4 bg-[#292929]/85 rounded-xl"
          >
            <div
              class="h-[16vh] overflow-x-auto scrollbar-hide pl-3.5 flex space-x-2.5 items-center justify-start"
              @click.stop
            >
              <div
                v-for="(img, index) in images"
                :key="index"
                @click="selectImage(index)"
                class="relative cursor-pointer w-23 h-23 flex-shrink-0"
              >
                <img :src="img" class="w-23 h-23 object-cover" />

                <div v-if="currentIndex !== index" class="absolute inset-0 bg-black/50"></div>
                <button
                  v-if="currentIndex == index"
                  class="absolute flex top-1 right-1 text-white bg-black/75 w-5 h-5 justify-center items-center rounded-full cursor-pointer"
                  @click.stop="deletePhoto(currentIndex)"
                >
                  <span class="h-5 font-thin text-[24px] -translate-y-[50%]">&times;</span>
                </button>
              </div>
            </div>

            <!-- Buton ADD -->
            <div class="z-50 w-22 pt-1 h-16 flex items-center justify-center">
              <button
                class="flex items-center justify-center w-12 h-12 rounded-full border-1 border-[#282929] text-[#a8a8a8] cursor-pointer"
                @click.stop="triggerAddMore"
              >
                <span class="text-[32px] pb-2">+</span>
              </button>

              <input
                ref="addMoreInput"
                type="file"
                accept="image/*"
                class="hidden"
                @change="addMoreImages"
              />
            </div>
          </div>

          <div
            class="flex-shrink-0 absolute right-4 bottom-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/70 cursor-pointer hover:bg-black/50"
            @click="addNewPhoto()"
          >
            <img src="../../crop1.png" alt="" class="w-4 h-4" />
          </div>
        </div>

        <!-- STEP 3: CREATE NEW POST -->
        <div v-if="step === 'create new post'" class="flex flex-col w-[850px] h-[560px]">
          <div
            class="w-full text-center bg-black border-b border-[#363636] py-2 font-semibold text-white items-center justify-between flex"
          >
            <button class="text-2xl pl-4 cursor-pointer" @click="goToCrop()">
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
            <span>Create new post</span>
            <button class="text-blue-300 font-medium text-sm pr-4 cursor-pointer" @click="savePost">
              Share
            </button>
          </div>

          <div class="flex h-full w-full">
            <div class="flex w-[520px] h-full justify-center items-center">
              <!-- Photos -->
              <div class="relative w-full h-full">
                <img
                  :src="previewImg"
                  alt="Post media"
                  class="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <template v-if="images.length > 1">
                  <button
                    v-if="currentIndex > 0"
                    @click="prevImage"
                    class="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/30 text-gray-900"
                  >
                    <font-awesome-icon :icon="['fas', 'chevron-left']" class="text-sm" />
                  </button>

                  <button
                    v-if="currentIndex < images.length - 1"
                    @click="nextImage"
                    class="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/30 text-gray-900"
                  >
                    <font-awesome-icon :icon="['fas', 'chevron-right']" class="text-sm" />
                  </button>

                  <div class="absolute bottom-4 left-0 right-0 flex justify-center space-x-1">
                    <span
                      v-for="(img, index) in images"
                      :key="index"
                      :class="index === currentIndex ? 'bg-white' : 'bg-gray-500'"
                      class="block w-1.5 h-1.5 rounded-full"
                    ></span>
                  </div>
                </template>
              </div>
            </div>

            <!-- POST DETAILS -->
            <div class="flex flex-col">
              <div class="flex space-x-3.5 items-center pt-4 pl-4">
                <img
                  alt="ProfilePic"
                  class="w-8 h-8 rounded-full"
                  :src="auth.currentUser.profilePicture"
                />
                <span class="text-sm font-semibold text-white">
                  {{ auth.currentUser.username }}
                </span>
              </div>

              <div class="flex flex-col space-y-3 w-[330px] h-full">
                <div class="relative">
                  <textarea
                    v-model="description"
                    maxlength="2200"
                    placeholder=""
                    class="w-full h-[220px] p-3 resize-none text-white focus:outline-none focus:ring-0"
                  ></textarea>
                  <div class="absolute bottom-4 right-3 text-right text-xs text-white/45 font-thin">
                    {{ description.length }}/2,200
                  </div>
                </div>

                <div class="flex h-12 w-full justify-between items-center">
                  <input
                    v-model="location"
                    type="text"
                    placeholder="Add location"
                    class="pl-4 text-base text-white font-normal focus:outline-none"
                  />
                  <img src="../../LocationPin.png" alt="" class="w-[21px] h-4 pr-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const step = ref('select')
const previewImg = ref('')
const images = ref([])
const currentIndex = ref(0)
const addingNewPhoto = ref(false)
const addMoreInput = ref(null)
const auth = useAuthStore()
const description = ref('')
const location = ref('')
const likes = ref(0)
const commentsCount = ref(0)
const emit = defineEmits(['close'])

const onFileSelected = (e) => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    previewImg.value = reader.result
    images.value = [reader.result]
    step.value = 'crop'
  }
  reader.readAsDataURL(file)
}

const selectImage = (index) => {
  currentIndex.value = index
  previewImg.value = images.value[index]
}

const triggerAddMore = () => {
  addMoreInput.value.click()
}

const addNewPhoto = () => {
  addingNewPhoto.value = !addingNewPhoto.value
}

const addMoreImages = (e) => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = () => {
    images.value.push(reader.result)
    currentIndex.value = images.value.length - 1
    previewImg.value = reader.result
  }
  reader.readAsDataURL(file)
}

const deletePhoto = (index) => {
  if (images.value.length === 0) return

  images.value.splice(index, 1)

  if (images.value.length === 0) {
    currentIndex.value = 0
    previewImg.value = ''
    step.value = 'select'
    return
  }

  if (index === images.value.length) {
    currentIndex.value = images.value.length - 1
  } else {
    currentIndex.value = index
  }

  previewImg.value = images.value[currentIndex.value]
}

const goToSelect = () => {
  step.value = 'select'
}

const goToCrop = () => {
  step.value = 'crop'
}

const goToCreate = () => {
  step.value = 'create new post'
}

const nextImage = () => {
  if (currentIndex.value < images.value.length - 1) {
    currentIndex.value++
    previewImg.value = images.value[currentIndex.value]
  }
}

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
    previewImg.value = images.value[currentIndex.value]
  }
}

async function savePost() {
  const newPost = {
    userId: auth.currentUser.id,
    mediaUrl: images.value,
    description: description.value,
    location: location.value,
    createdAt: new Date().toISOString(),
    likes: likes.value,
    commentsCount: commentsCount.value,
  }

  console.log(newPost.location)

  try {
    const res = await fetch('http://localhost:3000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })

    if (!res.ok) throw new Error('Failed to save')

    const saved = await res.json()

    description.value = ''
    location.value = ''
    images.value = []
    currentIndex.value = 0

    emit('close')
  } catch (err) {
    console.error(err)
  }
}

onMounted(async () => {
  document.body.style.overflow = 'hidden'
  if (!auth.currentUser) {
    await auth.fetchUserFromSession()
  }
})

onBeforeUnmount(() => {
  document.body.style.overflow = 'auto'
  document.body.style.overflowX = 'hidden'
})
</script>

<style scoped>
/* Hide scrollbar — Chrome, Safari */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar — Firefox */
.scrollbar-hide {
  scrollbar-width: none;
}

/* Hide scrollbar — IE/Edge */
.scrollbar-hide {
  -ms-overflow-style: none;
}
</style>
