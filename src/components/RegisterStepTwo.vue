<template>
  <div class="">
    <div class="flex flex-col left-auto items-center justify-center p-3">
      <div
        class="flex flex-col w-[350px] p-10 gap-2 items-center text-center justify-center border border-[#363636]"
      >
        <div class="items-center">
          <img src="../../birthday.png" alt="logo" class="w-32" />
        </div>
        <h2 class="text-white text-s font-semibold mb-2">{{ t('register.birthday.title') }}</h2>
        <p class="text-white/60 text-sm mb-4">
          {{ t('register.birthday.subtitle') }}
          <a
            href="https://help.instagram.com/155833707900388"
            class="text-[#6383f6]"
            target="_blank"
          >
            {{ t('register.birthday.why') }}
          </a>
        </p>

        <!-- Birthday selectors -->
        <div class="flex gap-2 justify-center mb-2">
          <select v-model="month" class="selectInput">
            <option disabled value="">{{ t('register.birthday.month') }}</option>
            <option v-for="m in months" :key="m.text" :value="m.text">{{ m.text }}</option>
          </select>

          <select v-model="day" class="selectInput">
            <option disabled value="">{{ t('register.birthday.day') }}</option>
            <option v-for="d in days" :key="d" :value="d">{{ d }}</option>
          </select>

          <select v-model="year" class="selectInput">
            <option disabled value="">{{ t('register.birthday.year') }}</option>
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
        </div>

        <span class="text-xs text-white/65 mt-2">{{ t('register.birthday.disclaimer1') }}</span>
        <span class="mt-2 text-xs text-white/65">
          {{ t('register.birthday.disclaimer2') }}
        </span>

        <button
          @click="handleFinish"
          class="bg-[#4a5df9] w-[240px] mt-4 text-white font-semibold py-1 px-6 rounded-lg hover:bg-[#4150f7]"
        >
          {{ t('register.next') }}
        </button>

        <button
          @click="emit('back')"
          class="bg-transparent text-[#4a5df9] font-semibold py-1 px-6 rounded-lg cursor-pointer hover:text-[#6383f6]"
        >
          {{ t('register.birthday.back') }}
        </button>

        <span class="mt-8 text-xs text-white/65 space-x-1">
          {{ t('register.report1') }}
          <a
            href="https://help.instagram.com/contact/406206379945942/"
            class="text-[#6383f6]"
            target="_blank"
          >
            {{ t('register.report2') }}
          </a>
          {{ t('register.report3') }}
        </span>
      </div>

      <!-- Login redirect -->
      <div
        class="flex flex-col mt-3 w-24 h-12 items-center text-center justify-center border border-[#363636] bg-black p-10 w-[350px]"
      >
        <p class="text-white text-12">{{ t('register.haveAccount') }}</p>
        <a
          href="/login"
          class="text-[#6383f6] font-semibold hover:underline hover:underline-offset-2"
        >
          {{ t('register.login') }}
        </a>
      </div>
    </div>
    <InstagramFooter />
  </div>
</template>

<script setup>
import InstagramFooter from '@/components/Footer.vue'
import { useAuthStore } from '@/stores/authStore'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits(['back'])

const auth = useAuthStore()
const router = useRouter()
const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
})

// Dropdown data
const months = computed(() => [
  { text: t('register.birthday.january') },
  { text: t('register.birthday.february') },
  { text: t('register.birthday.march') },
  { text: t('register.birthday.april') },
  { text: t('register.birthday.may') },
  { text: t('register.birthday.june') },
  { text: t('register.birthday.july') },
  { text: t('register.birthday.august') },
  { text: t('register.birthday.september') },
  { text: t('register.birthday.october') },
  { text: t('register.birthday.november') },
  { text: t('register.birthday.december') },
])

const month = ref('')
const day = ref('')
const year = ref('')

const days = computed(() => {
  const monthIndex = months.value.findIndex((m) => m.text === month.value)
  const yearNum = parseInt(year.value)
  const daysInMonth = new Date(yearNum || 2024, monthIndex + 1, 0).getDate()
  return Array.from({ length: daysInMonth }, (_, i) => i + 1)
})

const currentYear = new Date().getFullYear()
const years = computed(() => Array.from({ length: 100 }, (_, i) => currentYear - i))

const handleFinish = async () => {
  if (!month.value || !day.value || !year.value) {
    alert('Please select your full birthday.')
    return
  }

  const formattedBirthday = `${month.value} ${day.value}, ${year.value}`
  const user = {
    ...props.userData,
    birthday: formattedBirthday,
    profilePicture: 'https://i.pinimg.com/736x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg',
    bio: '',
    gender: '',
    showThreads: false,
    showSuggestions: false,
  }

  try {
    const res = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })

    if (!res.ok) throw new Error('Failed to register')

    const savedUser = await res.json()

    auth.setUser(savedUser)

    router.push('/')
  } catch (err) {
    console.error(err)
    alert('Error creating account.')
  }
}
</script>

<style scoped>
.selectInput {
  background-color: #121212;
  border: 1px solid #555555;
  border-radius: 0.25rem;
  padding: 0.4rem 0.6rem;
  color: white;
  font-size: 0.8rem;
  width: 90px;
  text-align: center;
  cursor: pointer;
}
.selectInput:focus {
  outline: none;
  border-color: #6383f6;
}
</style>
