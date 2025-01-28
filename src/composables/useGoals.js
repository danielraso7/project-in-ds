import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import router from '@/router'

export function useGoals() {
  const loading = ref(false)
  const error = ref(null)

  const toast = useToast()

  const goals = ref([])

  const fetchGoals = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get('/api/goals')
      goals.value = response.data
    } catch (ex) {
      error.value = ex
      toast.error('Could not retrieve goals. Please try again. ' + `${ex.response.data.message ? ex.response.data.message : ''}`)
    } finally {
      loading.value = false
    }
  }

  const createGoal = async (newGoal) => {
    loading.value = true
    error.value = null

    try {
      await axios.post('/api/goals', newGoal)
      await fetchGoals()
      toast.success('Goal created successfully.')
      router.push('/goals')
    } catch (ex) {
      error.value = ex
      toast.error('Could not create goal. Please try again. ' + `${ex.response.data.message ? ex.response.data.message : ''}`)
    } finally {
      loading.value = false
    }
  }

  return {
    goals,
    loading,
    error,
    fetchGoals,
    //deleteGoalById,
    createGoal,
  }
}
