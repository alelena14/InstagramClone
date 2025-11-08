<template>
  <div class="flex flex-col">
    <div class="flex left-auto justify-center pt-[14vh] space-x-34 pb-30">
      <div>
        <img src="../../login.png" alt="login_png" class="w-[445px] mt-1" />
      </div>

      <div class="flex flex-col top-0 w-[290px] items-center text-center">
        <div class="items-center justify-center mb-6">
          <img src="../../InstagramLogo.png" alt="logo" class="w-44" />
        </div>

        <!-- Login form -->
        <form @submit.prevent="handleLogin" class="flex flex-col text-white">
          <input
            v-model="identifier"
            type="text"
            class="formInput"
            placeholder="Phone number, username, or email"
            required
          />
          <input
            v-model="password"
            type="password"
            class="formInput"
            placeholder="Password"
            required
          />

          <button
            type="submit"
            class="bg-[#4a5df9] w-[270px] mt-2 text-white text-10 font-semibold py-1 px-6 rounded-lg hover:bg-[#4150f7] cursor-pointer"
          >
            Log in
          </button>
        </form>

        <div v-if="loginStatus === 0" class="text-red-400 text-[14px] mt-3">
          No account found with that email, phone number, or username.
        </div>

        <div v-else-if="loginStatus === -1" class="text-red-400 text-[14px] mt-3">
          Sorry, your password was incorrect. Please double-check your password.
        </div>

        <div class="mt-8 text-[14px] font-medium items-center text-white">
          <span class="cursor-pointer hover:underline hover:underline-offset-1">
            Forgot password?
          </span>
        </div>

        <div class="mt-8 text-xs text-white/65 space-x-1">
          <span>
            You can also
            <a
              href="https://help.instagram.com/contact/406206379945942/"
              class="text-[#6383f6] hover:underline hover:underline-offset-2"
              target="_blank"
              >report content you believe is unlawful
            </a>
            in your country without logging in.
          </span>
        </div>

        <div class="flex flex-col text-white pt-12">
          <span class="text-[14px]">
            Don't have an account?
            <a href="/register" class="text-[#6383f6] text-[14px] font-semibold">Sign up</a>
          </span>
        </div>
      </div>
    </div>

    <InstagramFooter />
  </div>
</template>

<script setup>
import InstagramFooter from '@/components/Footer.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()
const router = useRouter()
const identifier = ref('')
const password = ref('')
const loginStatus = ref(null) // 0 = user not found, -1 = wrong password, 1 = success
const API_URL = 'http://localhost:3000/users'

async function handleLogin() {
  const value = identifier.value.trim()
  const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
  const isPhone = /^07\d{8}$/.test(value)

  try {
    const res = await fetch(API_URL)
    const users = await res.json()

    const user = users.find(
      (u) =>
        (isEmail && u.email === value) || (isPhone && u.phone === value) || u.username === value,
    )

    if (!user) {
      loginStatus.value = 0
      return
    }

    if (user.password !== password.value) {
      loginStatus.value = -1
      return
    }

    loginStatus.value = 1
    auth.setUser(user)

    router.push('/')
  } catch (err) {
    console.error('Login error:', err)
    loginStatus.value = 0
  }
}
</script>

<style scoped>
.formInput {
  background-color: #121212;
  border: 1px solid #555555;
  border-radius: 0.25rem;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  color: white;
  font-size: 0.75rem;
  width: 270px;
}
</style>
