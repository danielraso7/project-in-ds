<script setup>
const props = defineProps({
  buttonText: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div class="row">
    <div class="col-12">
      <button class="btn btn-primary w-100 btn-sm" type="submit" :disabled="disabled">{{ buttonText }}</button>
    </div>
  </div>
</template>
