<template>
  <div class="flex flex-col left-auto items-center justify-center">
    <div
      class="flex flex-col gap-2 items-center text-center justify-center border border-[#363636] p-10 w-[350px]"
    >
      <div class="items-center">
        <img src="../../InstagramLogo.png" alt="logo" class="w-40" />
      </div>
      <p class="text-white/65 bold items-center justify-center">
        Sign up to see photos and videos from your friends.
      </p>

      <!-- Register Form -->
      <form @submit.prevent="handleNext" class="flex flex-col text-white">
        <input
          v-model="identifier"
          type="text"
          class="formInput"
          placeholder="Mobile Number or Email"
          required
        />
        <input v-model="fullName" type="text" class="formInput" placeholder="Full Name" required />
        <input v-model="username" type="text" class="formInput" placeholder="Username" required />
        <input
          v-model="password"
          type="password"
          class="formInput"
          placeholder="Password"
          required
        />
      </form>

      <div class="text-xs text-white/65 space-x-1">
        <span>
          People who use our service may have uploaded your contact information to Instagram.
        </span>
        <a
          href="https://www.facebook.com/help/instagram/261704639352628"
          class="text-[#6383f6]"
          target="_blank"
          >Learn More</a
        >
      </div>
      <div class="mt-4 text-xs text-white/65 space-x-1">
        <span>
          By signing up, you agree to our
          <a
            href="https://www.facebook.com/legal/terms/plain_text_terms"
            class="text-[#6383f6]"
            target="_blank"
            >Terms</a
          >
          Learn how we collect, use and share your data in our
          <a
            href="https://www.facebook.com/privacy/policy/?entry_point=data_policy_redirect&entry=0"
            class="text-[#6383f6]"
            target="_blank"
            >Privacy Policy</a
          >
          and how we use cookies and similar technology in our
          <a href="https://www.facebook.com/legal/cookies/" class="text-[#6383f6]" target="_blank"
            >Cookies Policy</a
          >.
        </span>
      </div>

      <button
        @click="handleNext"
        class="bg-[#4a5df9] w-[240px] mt-2 text-white text-10 font-semibold py-1 px-6 rounded-lg hover:bg-[#4150f7] cursor-pointer"
      >
        Next
      </button>

      <div class="mt-8 text-xs text-white/65 space-x-1">
        <span>
          You can also
          <a
            href="https://help.instagram.com/contact/406206379945942/"
            class="text-[#6383f6]"
            target="_blank"
            >report content you believe is unlawful
          </a>
          in your country without logging in.
        </span>
      </div>
    </div>

    <!-- Login redirect -->
    <div
      class="flex flex-col mt-3 w-24 h-12 items-center text-center justify-center border border-[#363636] bg-black p-10 w-[350px]"
    >
      <p class="text-white text-12">Have an account?</p>
      <a href="/login" class="text-[#6383f6] font-semibold hover:underline hover:underline-offset-2"
        >Log in</a
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['next'])

const identifier = ref('')
const username = ref('')
const fullName = ref('')
const password = ref('')

const handleNext = () => {
  const value = identifier.value.trim()
  const isEmail = value.includes('@')
  const isPhone = /^[0-9]+$/.test(value)

  if (!isEmail && !isPhone) {
    alert('Please enter a valid email or phone number.')
    return
  }

  const data = {
    username: username.value,
    fullName: fullName.value,
    email: isEmail ? value : null,
    phone: isPhone ? value : null,
    password: password.value,
  }

  emit('next', data)
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
  width: 240px;
}
</style>
