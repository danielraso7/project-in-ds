<script setup>
import { ref, reactive, onMounted } from 'vue'
import SubmitButton from '@/components/SubmitButton.vue'
import { useCategory } from '@/composables/useCategory'

const { categories, loading, fetchCategories, createCategory } = useCategory()

const formData = reactive({
  label: '',
  color: 'success',
})

const bootstrapColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']

const cycleColor = () => {
  const currentIndex = bootstrapColors.indexOf(formData.color)
  const nextIndex = (currentIndex + 1) % bootstrapColors.length
  formData.color = bootstrapColors[nextIndex]
}

const durationHHMM = (duration) => {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

const handleCreate = async () => {
  const newCategory = {
    label: formData.label,
    color: formData.color,
  }

  await createCategory(newCategory)

  formData.label = ''
  formData.color = 'success'
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
          <form @submit.prevent="handleCreate">
            <div class="mb-3">
              <label class="form-label" for="categoryLabel"
                ><strong>Category Label</strong> <span :class="`badge rounded-pill text-bg-${formData.color}`">{{ formData.label }}</span></label
              >
              <input id="categoryLabel" class="form-control me-2" type="text" v-model="formData.label" placeholder="Enter category label" required />
            </div>
            <div class="mb-3">
              <label class="form-label"><strong>Category Color</strong></label>
              <div class="d-flex">
                <button type="button" class="btn btn me-2" :class="`btn-${formData.color}`" @click="cycleColor">
                  {{ formData.color }}
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
                <tr v-for="category in categories" :key="'cat_' + category.id">
                  <td>
                    <span :class="`badge text-bg-${category.color} rounded-pill`">{{ category.label }}</span>
                  </td>
                  <td>{{ category.tripCount }}</td>
                  <td>{{ durationHHMM(category.totalDuration) }}</td>
                  <td>{{ category.totalDistance }}</td>
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
