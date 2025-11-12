<template>
  <div>
    <div class="flex flex-col left-auto items-center justify-center">
      <div
        class="flex flex-col gap-2 items-center text-center justify-center border border-[#363636] p-10 w-[350px]"
      >
        <div class="items-center">
          <img src="../../InstagramLogo.png" alt="logo" class="w-40" />
        </div>
        <p class="text-white/65 bold items-center justify-center">
          {{ t('register.title') }}
        </p>

        <!-- Register Form -->
        <form @submit.prevent="handleNext" class="flex flex-col text-white">
          <input
            v-model="identifier"
            type="text"
            class="formInput"
            :placeholder="t('register.emailOrPhone')"
            required
          />
          <p v-if="identifierError" class="text-red-500 text-xs mt-1 text-left">
            {{ identifierError }}
          </p>
          <input
            v-model="fullName"
            type="text"
            class="formInput"
            :placeholder="t('register.fullName')"
            required
          />
          <input
            v-model="username"
            type="text"
            class="formInput"
            :placeholder="t('register.username')"
            required
          />
          <input
            v-model="password"
            type="password"
            class="formInput"
            :placeholder="t('register.password')"
            @input="validatePassword"
            required
          />
          <p v-if="passwordError" class="text-red-500 text-xs mt-1 text-left">
            {{ passwordError }}
          </p>
        </form>

        <div class="text-xs text-white/65 space-x-1">
          <span>
            {{ t('register.terms.info1') }}
          </span>
          <a
            href="https://www.facebook.com/help/instagram/261704639352628"
            class="text-[#6383f6]"
            target="_blank"
            >{{ t('register.terms.learnMore') }}</a
          >
        </div>
        <div class="mt-4 text-xs text-white/65 space-x-1">
          <span>
            {{ t('register.terms.info2') }}
            <a
              href="https://www.facebook.com/legal/terms/plain_text_terms"
              class="text-[#6383f6] hover:underline hover:underline-offset-2"
              target="_blank"
              >{{ t('register.terms.terms') }}</a
            >
            {{ t('register.terms.dataInfo') }}
            <a
              href="https://www.facebook.com/privacy/policy/?entry_point=data_policy_redirect&entry=0"
              class="text-[#6383f6] hover:underline hover:underline-offset-2"
              target="_blank"
              >{{ t('register.terms.privacyPolicy') }}</a
            >
            {{ t('register.terms.cookiesInfo') }}
            <a
              href="https://www.facebook.com/legal/cookies/"
              class="text-[#6383f6] hover:underline hover:underline-offset-2"
              target="_blank"
              >{{ t('register.terms.cookiesPolicy') }}</a
            >.
          </span>
        </div>

        <button
          @click="handleNext"
          class="bg-[#4a5df9] w-[240px] mt-2 text-white text-10 font-semibold py-1 px-6 rounded-lg hover:bg-[#4150f7] cursor-pointer"
        >
          {{ t('register.next') }}
        </button>

        <div class="mt-8 text-xs text-white/65 space-x-1">
          <span>
            {{ t('register.report1') }}
            <a
              href="https://help.instagram.com/contact/406206379945942/"
              class="text-[#6383f6] hover:underline hover:underline-offset-2"
              target="_blank"
              >{{ t('register.report2') }}
            </a>
            {{ t('register.report3') }}
          </span>
        </div>
      </div>

      <!-- Login redirect -->
      <div
        class="flex flex-col mt-3 w-24 h-12 items-center text-center justify-center border border-[#363636] bg-black p-10 w-[350px]"
      >
        <p class="text-white text-12">{{ t('register.haveAccount') }}</p>
        <a
          href="/login"
          class="text-[#6383f6] font-semibold hover:underline hover:underline-offset-2"
          >{{ t('register.login') }}</a
        >
      </div>
    </div>
    <InstagramFooter />
  </div>
</template>

<script setup>
import InstagramFooter from '@/components/Footer.vue'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const emit = defineEmits(['next'])

const identifier = ref('')
var identifierError = ref('')
const username = ref('')
const fullName = ref('')
const password = ref('')
var passwordError = ref('')

const handleNext = () => {
  const value = identifier.value.trim()
  const isEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)
  const isPhone = /^07\d{8}$/.test(value)
  const isValidPassword = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/.test(password.value)

  if (!isValidPassword) {
    passwordError.value =
      'Password must be at least 8 characters, contain one uppercase letter and one special character.'
    return
  } else {
    passwordError.value = ''
  }

  if (!isEmail && !isPhone) {
    identifierError.value = 'Please enter a valid email or phone number.'
    return
  } else {
    identifierError.value = ''
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
