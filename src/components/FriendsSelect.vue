<script setup>
import { defineProps, defineModel } from 'vue'

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
    <label class="form-label">Friends</label>
    <div v-for="friend in friends" :key="friend.id" class="form-check">
      <input :id="friend.id" class="form-check-input" type="checkbox" :value="friend.value" v-model="selectedFriends" />
      <label class="form-check-label" :for="friend.id">{{ friend.label }}</label>
    </div>
  </div>
</template>
