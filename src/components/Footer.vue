<template>
  <footer class="flex flex-col items-center justify-center text-xs text-white/65 py-6 space-y-4.5">
    <!-- Links -->
    <div class="flex flex-wrap justify-center gap-4.5 text-center">
      <a
        v-for="link in links"
        :key="link.text"
        :href="link.url"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:underline hover:underline-offset-1"
      >
        {{ link.text }}
      </a>
    </div>

    <!-- Language selector -->
    <div class="flex items-center gap-3.5">
      <select
        v-model="currentLanguage"
        @change="changeLanguage"
        class="bg-transparent px-2 py-1 text-xs cursor-pointer"
      >
        <option value="en">English</option>
        <option value="ro">Română</option>
      </select>

      <span>{{ t('footer.copyright') }}</span>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { computed, ref, onMounted } from 'vue'

const { t, locale } = useI18n()
const currentLanguage = ref(localStorage.getItem('lang') || 'en')

const changeLanguage = () => {
  locale.value = currentLanguage.value
  localStorage.setItem('lang', currentLanguage.value)
}

const links = computed(() => [
  { text: t('footer.links.meta'), url: 'https://about.meta.com/' },
  { text: t('footer.links.about'), url: 'https://about.instagram.com/' },
  { text: t('footer.links.blog'), url: 'https://about.instagram.com/blog/' },
  { text: t('footer.links.jobs'), url: 'https://www.instagram.com/about/jobs/' },
  { text: t('footer.links.help'), url: 'https://help.instagram.com/' },
  { text: t('footer.links.api'), url: 'https://developers.facebook.com/docs/instagram' },
  { text: t('footer.links.privacy'), url: 'https://privacycenter.instagram.com/policy/' },
  { text: t('footer.links.cookies'), url: 'https://privacycenter.instagram.com/policies/cookies/' },
  { text: t('footer.links.terms'), url: 'https://help.instagram.com/581066165581870/' },
  { text: t('footer.links.locations'), url: 'https://www.instagram.com/explore/locations/' },
  { text: t('footer.links.lite'), url: 'https://www.instagram.com/web/lite/' },
  { text: t('footer.links.metaAI'), url: 'https://about.meta.com/ai/' },
  { text: t('footer.links.metaAIArticles'), url: 'https://about.fb.com/news/meta-ai/' },
  { text: t('footer.links.threads'), url: 'https://www.threads.net/' },
  {
    text: t('footer.links.contactUpload'),
    url: 'https://www.facebook.com/help/instagram/261704639352628/',
  },
  { text: t('footer.links.verified'), url: 'https://about.meta.com/technologies/meta-verified/' },
])

onMounted(() => {
  locale.value = currentLanguage.value
})
</script>

<style scoped>
option {
  background-color: #121212;
  color: white;
}
</style>
