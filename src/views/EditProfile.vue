<template>
  <div class="flex bg-black min-h-screen max-h-full text-white">
    <div class="lg:block border-r border-gray-700/50 fixed h-full">
      <Sidebar />
    </div>

    <div class="flex flex-col w-[100vw] ml-[350px]">
      <div class="flex flex-col ml-[120px] pt-12 w-[40vw]">
        <h2 class="text-xl font-bold mb-9">Edit Profile</h2>

        <!-- PROFILE HEADER -->
        <div class="flex space-x-4 px-4 bg-[#262626] rounded-xl p-4">
          <img
            :src="auth.currentUser?.profilePicture"
            alt="ProfilePic"
            class="w-14 h-14 rounded-full object-cover"
          />

          <div class="flex flex-col justify-center">
            <span class="text-lg font-medium">{{ auth.currentUser?.username }}</span>
            <span class="text-sm font-light text-[#a8a8a8]">{{ auth.currentUser?.fullName }}</span>
          </div>

          <div class="justify-center items-center flex ml-auto space-x-4">
            <label
              for="profilePic"
              class="bg-[#4a5df9] py-1.5 px-3 text-white text-sm font-semibold rounded-md hover:bg-[#4150f7] cursor-pointer"
            >
              Change Photo
            </label>
            <input
              id="profilePic"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileUpload"
            />
          </div>
        </div>

        <!-- BIO -->
        <div class="my-4">
          <span class="block font-bold mb-2">Bio</span>
          <textarea
            v-model="bio"
            maxlength="150"
            placeholder="Write something about yourself..."
            class="w-full border border-[#363636] rounded-xl p-3 resize-none h-20"
          ></textarea>
          <div class="text-right text-xs text-white/65">{{ bio.length }} / 150</div>
        </div>

        <!-- THREADS -->
        <div class="mb-6">
          <span class="block font-bold mb-2">Show Threads badge</span>
          <div class="flex justify-between items-center border border-[#363636] rounded-2xl p-4">
            <span>Show Threads badge</span>
            <div
              class="relative w-10 h-6 flex items-center rounded-full transition-colors duration-200 cursor-pointer"
              :class="showThreads ? 'bg-white' : 'bg-[#2b3036]'"
              @click="showThreads = !showThreads"
            >
              <div
                class="w-5 h-5 bg-[#0c1014] rounded-full transition-transform duration-200"
                :class="showThreads ? 'translate-x-4.5' : 'translate-x-0.5'"
              ></div>
            </div>
          </div>
        </div>

        <!-- GENDERS -->
        <div class="mb-6">
          <span class="block font-bold mb-2">Gender</span>
          <div class="relative">
            <div
              @click="toggleDropdown"
              class="flex justify-between items-center border border-[#363636] rounded-xl p-3 cursor-pointer hover:bg-[#121212] transition"
            >
              <span>{{ selectedGender || 'Select gender' }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 transition-transform"
                :class="{ 'rotate-180': showDropdown }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <div
              v-if="showDropdown"
              class="absolute mt-2 w-full bg-[#121212] rounded-xl shadow-lg z-10"
            >
              <div
                v-for="option in options"
                :key="option"
                @click="selectOption(option)"
                class="flex justify-between items-center px-4 py-3 hover:bg-[#1e1e1e] cursor-pointer rounded-lg"
              >
                <span>{{ option }}</span>
                <span v-if="selectedGender === option" class="text-white">✓</span>
              </div>
            </div>
          </div>
          <p class="text-xs text-white/65 mt-2">This won't be part of your public profile.</p>
        </div>

        <!-- SUGGESTIONS -->
        <div class="mb-6">
          <span class="block font-bold mb-2">Show account suggestions on profiles</span>

          <div
            class="flex justify-between items-center border border-[#363636] rounded-2xl py-4 px-4"
          >
            <div class="flex flex-col max-w-[90%]">
              <span>Show account suggestions on profiles</span>
              <span class="text-xs text-white/65">
                Choose whether people can see similar account suggestions on your profile, and
                whether your account can be suggested on other profiles.</span
              >
            </div>
            <div
              class="relative w-10 h-6 flex items-center rounded-full transition-colors duration-200 cursor-pointer"
              :class="showSuggestions ? 'bg-white' : 'bg-[#2b3036]'"
              @click="showSuggestions = !showSuggestions"
            >
              <div
                class="w-5 h-5 bg-[#0c1014] rounded-full transition-transform duration-200"
                :class="showSuggestions ? 'translate-x-4.5' : 'translate-x-0.5'"
              ></div>
            </div>
          </div>
        </div>

        <!-- OTHER INFO -->
        <div class="text-xs text-white/65 space-x-1">
          <span>
            Certain profile info, like your name, bio and links, is visible to everyone.
          </span>
          <a
            href="https://help.instagram.com/347751748650214?ref=igweb"
            class="text-[#6383f6]"
            target="_blank"
            >See what profile info is visible</a
          >
        </div>

        <!-- SAVE BUTTON -->
        <button
          @click="saveChanges"
          :disabled="!isDirty"
          class="py-3 px-24 my-6 ml-auto text-white text-sm font-bold rounded-lg transition"
          :class="
            isDirty
              ? 'bg-[#4a5df9] hover:bg-[#4150f7] cursor-pointer'
              : 'bg-[#18208b] cursor-not-allowed'
          "
        >
          Sumbit
        </button>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Sidebar from '../components/Sidebar.vue'
import Footer from '../components/Footer.vue'
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()
const bio = ref('')
const showThreads = ref(false)
const showSuggestions = ref(false)
const showDropdown = ref(false)
const selectedGender = ref('')
const previewImage = ref('')
const saveMessage = ref('')
const isDirty = ref(false)

watch([bio, showThreads, selectedGender, previewImage], () => {
  isDirty.value = true
})

const options = ['Female', 'Male', 'Custom', 'Prefer not to say']

const toggleDropdown = () => (showDropdown.value = !showDropdown.value)

const selectOption = (option) => {
  selectedGender.value = option
  showDropdown.value = false
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      previewImage.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

onMounted(async () => {
  if (!auth.currentUser) await auth.fetchUserFromSession()
  bio.value = auth.currentUser?.bio || ''
  selectedGender.value = auth.currentUser?.gender || ''
  showThreads.value = auth.currentUser?.showThreads || false
  previewImage.value = auth.currentUser?.profilePicture || ''
  isDirty.value = false
})

const saveChanges = async () => {
  if (!auth.currentUser?.id) return
  isDirty.value = false

  const updatedUser = {
    ...auth.currentUser,
    bio: bio.value,
    gender: selectedGender.value,
    showThreads: showThreads.value,
    profilePicture: previewImage.value || auth.currentUser.profilePicture,
  }

  try {
    const res = await fetch(`http://localhost:3000/users/${auth.currentUser.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    })

    if (!res.ok) throw new Error('Failed to update user.')

    const data = await res.json()
    auth.setUser(data)
    setTimeout(() => (saveMessage.value = ''), 3000)
  } catch (err) {
    console.error('Error updating profile:', err)
  }
}
</script>
