<template>
  <div class="flex flex-col items-center justify-center">
    <!-- Pasul 1 -->
    <RegisterStepOne v-if="step === 1" @next="handleNextStep" />

    <!-- Pasul 2 -->
    <RegisterStepTwo
      v-else-if="step === 2 && Object.keys(userData).length"
      :user-data="userData"
      @back="handleGoBack"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RegisterStepOne from '@/components/RegisterStepOne.vue'
import RegisterStepTwo from '@/components/RegisterStepTwo.vue'

const step = ref(1)
const userData = ref({})

const handleNextStep = (data) => {
  userData.value = data
  step.value = 2
}

const handleGoBack = () => {
  step.value = 1
}
</script>
