<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="d-sm-flex justify-content-between align-items-center mb-4">
    <h3 class="text-dark mb-0">Trips</h3>
    <RouterLink class="btn btn-primary btn-sm d-none d-sm-inline-block" role="button" to="/trips/add"
      ><i class="fa-solid fa-plus"></i> Add Trip</RouterLink
    >
  </div>
</template>

<style lang="css" scoped></style>
