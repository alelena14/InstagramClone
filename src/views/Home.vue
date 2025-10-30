<template>
  <div class="flex bg-black min-h-screen max-h-full text-white">
    <div class="lg:block border-r border-gray-700/50 fixed h-full">
      <Sidebar />
    </div>

    <div class="ml-[350px] p-6">
      <div class="flex mx-auto">
        <div class="w-[60%] space-x-20">
          <StoryNavbar />
          <MainFeed />
        </div>

        <div class="w-[10%] pt-10">
          <SuggestionsSidebar />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import StoryNavbar from '../components/StoryNavbar.vue'
import MainFeed from '../components/MainFeed.vue'
import SuggestionsSidebar from '../components/SuggestionsSidebar.vue'
</script>

<style scoped></style>
