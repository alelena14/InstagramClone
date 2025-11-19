<template>
  <div class="w-[245px] h-full bg-black p-2.5 text-white">
    <div class="items-center p-2">
      <img src="../../InstagramLogo.png" alt="logo" class="w-24 pt-6 pb-4" />
    </div>

    <ul class="space-y-2 flex flex-col pt-2">
      <li class="navbar-button" @click="goToHome()">
        <img src="../../HomeLogo.png" alt="HomeLogo" class="w-6" />Home
      </li>
      <li class="navbar-button">
        <img src="../../SearchLogo.png" alt="SearchLogo" class="w-6" />Search
      </li>
      <li class="navbar-button">
        <img src="../../ExploreLogo.png" alt="ExploreLogo" class="w-6" />Explore
      </li>
      <li class="navbar-button">
        <img src="../../ReelsLogo.png" alt="ReelsLogo" class="w-6" />Reels
      </li>
      <li class="navbar-button"><img src="../../DMLogo.png" alt="DMLogo" class="w-6" />Messages</li>
      <li class="navbar-button">
        <img src="../../NotificationsLogo.png" alt="NotificationsLogo" class="w-6" />Notifications
      </li>
      <li class="navbar-button" @click="showCreateModal = true">
        <img src="../../CreateLogo.png" alt="CreateLogo" class="w-6" />Create
      </li>

      <li class="navbar-button" @click="showProfile()">
        <img
          :src="auth.currentUser.profilePicture"
          alt="ProfilePic"
          class="w-6 rounded-full"
        />Profile
      </li>
    </ul>

    <NewPost v-if="showCreateModal" @close="showCreateModal = false" />
    <ul class="space-y-2 flex flex-col pt-20">
      <div
        v-show="showMenu"
        class="absolute w-[270px] h-[55px] bottom-full items-start mb-2 left-4 top-[75vh] bg-[#222] text-white text-sm rounded-xl px-2 py-2"
      >
        <p
          class="cursor-pointer mb-4 pb-3 pt-2 px-3 rounded-xl font-normal hover:bg-[#333]"
          @click.stop="handleLogout"
        >
          Log out
        </p>
      </div>

      <li class="navbar-button relative" ref="moreButton" @click="toggleMenu">
        <img src="../../MoreLogo.png" alt="MoreLogo" class="w-6 inline-block mr-2" />
        More
      </li>

      <li class="navbar-button">
        <img src="../../MetaLogo.png" alt="MetaLogo" class="w-6" />From Meta
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import NewPost from '@/components/NewPost.vue'

const showCreateModal = ref(false)

const auth = useAuthStore()
const showMenu = ref(false)
const moreButton = ref(null)
const router = useRouter()

const goToHome = () => {
  router.push('/')
}

const showProfile = () => {
  router.push(`/profile`)
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const handleLogout = () => {
  auth.clearUser()
  router.push('/login')
}

function handleClickOutside(event) {
  if (moreButton.value && !moreButton.value.contains(event.target)) {
    showMenu.value = false
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
.navbar-button {
  display: flex;
  padding: 0.7rem;
  border-color: transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  gap: 1rem;
}

.navbar-button:hover {
  background-color: rgba(162, 162, 162, 0.2);
  transition: ease-in-out 200ms;
}
</style>
