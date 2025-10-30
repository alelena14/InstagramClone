<template>
  <div class="w-[245px] h-full bg-black p-2.5 text-white">
    <div class="items-center p-2">
      <img src="../../InstagramLogo.png" alt="logo" class="w-24 pt-6 pb-4" />
    </div>

    <ul class="space-y-2 flex flex-col pt-2">
      <li class="navbar-button"><img src="../../HomeLogo.png" alt="HomeLogo" class="w-6" />Home</li>
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
      <li class="navbar-button">
        <img src="../../CreateLogo.png" alt="CreateLogo" class="w-6" />Create
      </li>
      <li class="navbar-button">
        <img src="../../ProfilePic.png" alt="ProfilePic" class="w-6" />Profile
      </li>
    </ul>

    <ul class="space-y-2 flex flex-col pt-20">
      <li class="navbar-button"><img src="../../MoreLogo.png" alt="MoreLogo" class="w-6" />More</li>
      <li class="navbar-button">
        <img src="../../MetaLogo.png" alt="MetaLogo" class="w-6" />From Meta
      </li>
    </ul>
  </div>
</template>

<script setup></script>

<style scoped>
.navbar-button {
  display: flex;
  text-align: center;
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
