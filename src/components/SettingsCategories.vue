<script setup>
import { ref, reactive, onMounted } from 'vue'
import SubmitButton from '@/components/SubmitButton.vue'

// Simulate fetching data from a database
const categories = ref([])
const newCategoryName = ref('')
const newCategoryColor = ref('success') // Default color
const loading = ref(false)

const bootstrapColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']

const fetchCategories = async () => {
  // Simulate an API call to fetch categories from the database
  categories.value = [
    { name: 'Work', color: 'primary', tripCount: 10, distance: 150, duration: 300 },
    { name: 'Personal', color: 'success', tripCount: 5, distance: 80, duration: 120 },
    // Add more categories as needed
  ]
  console.log('Categories fetched:', categories.value)
}

const addCategory = async () => {
  loading.value = true
  // Simulate an API call to add a category
  const success = true // Replace with actual API call result
  if (success) {
    await fetchCategories() // Reload the categories list
    newCategoryName.value = '' // Clear the input field
    newCategoryColor.value = 'success' // Reset the color
  } else {
    alert('Failed to add category. Please try again.')
  }
  loading.value = false
}

const cycleColor = () => {
  const currentIndex = bootstrapColors.indexOf(newCategoryColor.value)
  const nextIndex = (currentIndex + 1) % bootstrapColors.length
  newCategoryColor.value = bootstrapColors[nextIndex]
}

const durationHHMM = (duration) => {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

onMounted(fetchCategories)
</script>

<template>
  <div class="row mb-3">
    <div class="col-lg-5">
      <div class="card shadow mb-3">
        <div class="card-header py-3">
          <h6 class="text-primary m-0 fw-bold">Add Category</h6>
        </div>
        <div class="card-body">
          <form @submit.prevent="addCategory">
            <div class="mb-3">
              <label class="form-label" for="categoryName"
                ><strong>Category Name</strong> <span :class="`badge rounded-pill text-bg-${newCategoryColor}`">{{ newCategoryName }}</span></label
              >
              <input id="categoryName" class="form-control me-2" type="text" v-model="newCategoryName" placeholder="Enter category name" required />
            </div>
            <div class="mb-3">
              <label class="form-label"><strong>Category Color</strong></label>
              <div class="d-flex">
                <button type="button" class="btn btn me-2" :class="`btn-${newCategoryColor}`" @click="cycleColor">
                  {{ newCategoryColor }}
                </button>
              </div>
            </div>
            <SubmitButton :button-text="'Add Category'" :disabled="loading" />
          </form>
        </div>
      </div>
    </div>
    <div class="col-lg-7">
      <div class="card shadow mb-3">
        <div class="card-header py-3">
          <h6 class="text-primary m-0 fw-bold">Categories List</h6>
        </div>
        <div class="card-body">
          <div v-if="loading" class="text-center">Loading...</div>
          <div v-else id="dataTableGrid" class="table-responsive table" role="grid">
            <table class="table my-0">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Trip Count</th>
                  <th>Duration (h)</th>
                  <th>Distance (km)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="category in categories" :key="category.name">
                  <td>
                    <span :class="`badge text-bg-${category.color} rounded-pill`">{{ category.name }}</span>
                  </td>
                  <td>{{ category.tripCount }}</td>
                  <td>{{ durationHHMM(category.duration) }}</td>
                  <td>{{ category.distance }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styling here */
</style>
