import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export function useCategory() {
  const loading = ref(false)
  const error = ref(null)

  const toast = useToast()

  const categories = ref([])

  const fetchCategories = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get('/api/categories')
      categories.value = response.data
    } catch (ex) {
      error.value = ex
      toast.error('Could not retrieve categories. Please try again. ' + `${ex.response.data.message ? ex.response.data.message : ''}`)
    } finally {
      loading.value = false
    }
  }

  const createCategory = async (newCategory) => {
    loading.value = true
    error.value = null

    try {
      await axios.post('/api/categories', newCategory)
      await fetchCategories()
      toast.success('Category created successfully.')
    } catch (ex) {
      error.value = ex
      toast.error('Could not create category. Please try again. ' + `${ex.response.data.message ? ex.response.data.message : ''}`)
    } finally {
      loading.value = false
    }
  }

  return {
    categories,
    loading,
    error,
    fetchCategories,
    //deleteCategoryById,
    createCategory,
  }
}
