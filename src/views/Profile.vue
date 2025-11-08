<template>
  <div class="flex bg-black min-h-screen max-h-full text-white">
    <div class="lg:block border-r border-gray-700/50 fixed h-full">
      <Sidebar />
    </div>

    <div class="flex flex-col ml-[300px] pt-12 items-center">
      <div class="justify-center items-center">
        <div class="flex space-x-8 px-6">
          <img
            alt="ProfilePic"
            class="w-36 h-36 rounded-full"
            :src="auth.currentUser.profilePicture"
          />
          <div class="flex flex-col">
            <h2 class="text-2xl font-light font-medium">{{ auth.currentUser.username }}</h2>
            <span class="text-xs py-2">{{ auth.currentUser.fullName }}</span>
            <div class="text-sm gap-4 space-x-4">
              <span><span class="font-medium">0</span> posts</span>
              <span><span class="font-medium">500</span> followers</span>
              <span><span class="font-medium">400</span> following</span>
            </div>
            <span class="text-sm pt-2">{{ auth.currentUser.bio }}</span>
          </div>
        </div>
        <div class="flex justify-evenly gap-3 p-6">
          <button
            class="bg-[#25292e] text-sm font-medium px-28 py-3 rounded-xl cursor-pointer"
            @click="goToEdit()"
          >
            Edit profile
          </button>
          <button class="bg-[#25292e] text-sm font-medium px-28 py-3 rounded-xl">
            View archive
          </button>
        </div>
        <div class="flex flex-col items-center justify-center space-y-2">
          <div
            class="flex p-0.5 rounded-full border-3 border-[#363636] w-22 h-22 items-center justify-center cursor-pointer"
          >
            <button
              class="relative flex items-center justify-center w-20 h-20 rounded-full border-2 border-black bg-[#121212] text-[#737373]"
            >
              <span class="text-[56px] pb-2">+</span>
            </button>
          </div>
          <span class="text-xs font-medium">New</span>
        </div>

        <div class="flex flex-col items-center justify-center py-20 text-center text-white">
          <div class="flex items-center justify-center w-16 h-16">
            <img src="../../CameraLogo.png" alt="" />
          </div>

          <h2 class="text-3xl font-extrabold py-2">Share Photos</h2>

          <p class="text-sm mb-4">When you share photos, they will appear on your profile.</p>

          <button
            class="text-[#3897f0] font-semibold hover:underline hover:underline-offset-2 transition"
          >
            Share your first photo
          </button>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import Footer from '../components/Footer.vue'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

onMounted(async () => {
  if (!auth.currentUser) {
    await auth.fetchUserFromSession()
  }
})

const goToEdit = () => {
  router.push('profile/edit')
}
</script>

<style scoped></style>
