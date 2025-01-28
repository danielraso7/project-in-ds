<script setup>
import { watch } from 'vue'

const props = defineProps({
  categories: Array,
})

const selectedCategory = defineModel('selectedCategory', {
  type: Number,
  default: null,
})

// Watch for changes in the categories prop
watch(
  () => props.categories,
  (newCategories) => {
    if (!selectedCategory.value && props.categories.length > 0) {
      selectedCategory.value = props.categories[0].id
    }
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <label class="form-label"><strong>Category</strong></label>
    <div class="row">
      <div v-for="category in categories" :key="category.id" class="col-4 mb-2 d-flex justify-content-center align-items-center">
        <input :id="'cat_' + category.id" class="btn-check" type="radio" name="category" :value="category.id" v-model="selectedCategory" />
        <label :class="`btn btn-outline-${category.color}`" :for="'cat_' + category.id">{{ category.label }}</label>
      </div>
    </div>
  </div>
</template>
