<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="d-sm-flex justify-content-between align-items-center mb-4">
    <h3 class="text-dark mb-0">Goals</h3>
    <RouterLink class="btn btn-primary btn-sm d-none d-sm-inline-block" role="button" to="/goals/add"
      ><i class="fa-solid fa-plus"></i> Add Goal</RouterLink
    >
  </div>
</template>

<style lang="css" scoped></style>
