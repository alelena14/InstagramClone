<template>
  <footer class="flex flex-col items-center justify-center text-xs text-white/65 py-6 space-y-4.5">
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

    <div class="flex items-center gap-3.5 text-white/65">
      <span>English</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
      <span>© 2025 Instagram from Meta</span>
    </div>
  </footer>
</template>

<script setup>
const links = [
  { text: 'Meta', url: 'https://about.meta.com/' },
  { text: 'About', url: 'https://about.instagram.com/' },
  { text: 'Blog', url: 'https://about.instagram.com/blog/' },
  { text: 'Jobs', url: 'https://www.instagram.com/about/jobs/' },
  { text: 'Help', url: 'https://help.instagram.com/' },
  { text: 'API', url: 'https://developers.facebook.com/docs/instagram' },
  { text: 'Privacy', url: 'https://privacycenter.instagram.com/policy/' },
  { text: 'Cookie Settings', url: 'https://privacycenter.instagram.com/policies/cookies/' },
  { text: 'Terms', url: 'https://help.instagram.com/581066165581870/' },
  { text: 'Locations', url: 'https://www.instagram.com/explore/locations/' },
  { text: 'Instagram Lite', url: 'https://www.instagram.com/web/lite/' },
  { text: 'Meta AI', url: 'https://about.meta.com/ai/' },
  { text: 'Meta AI Articles', url: 'https://about.fb.com/news/meta-ai/' },
  { text: 'Threads', url: 'https://www.threads.net/' },
  {
    text: 'Contact Uploading & Non-Users',
    url: 'https://www.facebook.com/help/instagram/261704639352628/',
  },
  { text: 'Meta Verified', url: 'https://about.meta.com/technologies/meta-verified/' },
]
</script>

<style scoped></style>
