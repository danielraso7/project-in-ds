<script setup>
const props = defineProps({
  buttonText: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="row">
    <div class="col-12">
      <button class="btn btn-primary w-100 btn-sm" type="submit">{{ buttonText }}</button>
    </div>
  </div>
</template>
