<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  categories: Array,
})

const selectedCategory = defineModel('selectedCategory', {
  type: String,
  default: '',
})

onMounted(() => {
  // set the "default" category to be selected by default (ALWAYS the first category returned by the DB)
  if (!selectedCategory.value && props.categories.length > 0) {
    selectedCategory.value = props.categories[0].value
  }
})
</script>

<template>
  <div>
    <label class="form-label"><strong>Category</strong></label>
    <div class="row">
      <div v-for="category in categories" :key="category.id" class="col d-flex justify-content-center">
        <input :id="category.id" class="btn-check" type="radio" name="category" :value="category.value" v-model="selectedCategory" />
        <label :class="`btn btn-outline-${category.color}`" :for="category.id">{{ category.label }}</label>
      </div>
    </div>
  </div>
</template>
