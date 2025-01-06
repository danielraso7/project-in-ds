<script setup>
import { ref } from 'vue'
import ProfileComponent from '@/components/SettingsProfile.vue'
import CategoriesComponent from '@/components/SettingsCategories.vue'
import FriendsComponent from '@/components/SettingsFriends.vue'

const activeTab = ref('profile')

const setActiveTab = (tab) => {
  activeTab.value = tab
}
</script>

<template>
  <h3 class="text-dark mb-4">Settings</h3>
  <div class="row mx-1">
    <ul class="nav nav-tabs w-100 justify-content-between custom-nav-tabs">
      <li class="nav-item flex-fill text-center">
        <a class="nav-link" :class="{ active: activeTab === 'profile' }" @click="setActiveTab('profile')" href="#"
          ><i class="fa-solid fa-user"></i>&nbsp;Profile</a
        >
      </li>
      <li class="nav-item flex-fill text-center">
        <a class="nav-link" :class="{ active: activeTab === 'categories' }" @click="setActiveTab('categories')" href="#"
          ><i class="fa-solid fa-icons"></i>&nbsp;Categories</a
        >
      </li>
      <li class="nav-item flex-fill text-center">
        <a class="nav-link" :class="{ active: activeTab === 'friends' }" @click="setActiveTab('friends')" href="#"
          ><i class="fa-solid fa-user-group"></i>&nbsp;Friends</a
        >
      </li>
    </ul>
    <div class="tab-content mt-3">
      <div v-if="activeTab === 'profile'" class="tab-pane fade show active">
        <ProfileComponent />
      </div>
      <div v-if="activeTab === 'categories'" class="tab-pane fade show active">
        <CategoriesComponent />
      </div>
      <div v-if="activeTab === 'friends'" class="tab-pane fade show active">
        <FriendsComponent />
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.nav-tabs .nav-item {
  flex: 1;
}
.nav-tabs .nav-link {
  width: 100%;
}
.custom-nav-tabs .nav-link {
  color: #000000; /* Blueish color for the text */
  background-color: #f8f9fa; /* Light background color */
  border: 1px solid #dee2e6; /* Border color */
  transition:
    background-color 0.3s,
    color 0.3s; /* Smooth transition for hover effects */
}

.custom-nav-tabs .nav-link:hover {
  background-color: #e2e6ea; /* Slightly darker background on hover */
  color: #0056b3; /* Darker blue on hover */
}

.custom-nav-tabs .nav-link.active {
  color: #fff; /* White text for active tab */
  background-color: #4e73df; /* Blueish background for active tab */
  border-color: #224abe; /* Blueish border for active tab */
}
</style>
