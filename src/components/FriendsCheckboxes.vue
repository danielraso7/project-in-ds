<script setup>
import {} from 'vue'

const props = defineProps({
  friends: Array,
})

const selectedFriends = defineModel('selectedFriends', {
  type: Array,
  default: () => [],
})
</script>

<template>
  <div>
    <label class="form-label"><strong>Friends</strong></label>
    <div v-for="friend in friends" :key="friend.id" class="form-check">
      <input :id="'fnd_' + friend.id" class="form-check-input" type="checkbox" :value="friend.username" v-model="selectedFriends" />
      <label class="form-check-label" :for="'fnd_' + friend.id">{{ friend.firstname + ' ' + friend.lastname }}</label>
    </div>
  </div>
</template>
