import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import router from '@/router'
const backendUrl = import.meta.env.VITE_API_BASE_URL

export function useTrips() {
  const loading = ref(false)
  const error = ref(null)

  const toast = useToast()

  const trips = ref([])

  const fetchTrips = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get(`${backendUrl}/trips`)
      trips.value = response.data
    } catch (ex) {
      error.value = ex
      toast.error('Could not retrieve trips. Please try again. ' + `${ex.response.data.message ? ex.response.data.message : ''}`)
    } finally {
      loading.value = false
    }
  }

  const deleteTripById = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this trip?')
    if (!confirmed) return

    loading.value = true
    error.value = null

    try {
      await axios.delete(`${backendUrl}/trips/${id}`)
      await fetchTrips() // refresh trips after deletion
      toast.success('Trip deleted successfully.')
    } catch (ex) {
      error.value = ex
      toast.error('Could not delete trip. Please try again. ' + `${ex.response.data.message ? ex.response.data.message : ''}`)
    } finally {
      loading.value = false
    }
  }

  const createTrip = async (newTrip) => {
    loading.value = true
    error.value = null

    try {
      await axios.post(`${backendUrl}/trips`, newTrip)
      await fetchTrips()
      toast.success('Trip created successfully.')
      router.push('/trips')
    } catch (ex) {
      error.value = ex
      toast.error('Could not create trip. Please try again. ' + `${ex.response.data.message ? ex.response.data.message : ''}`)
    } finally {
      loading.value = false
    }
  }

  return {
    trips,
    loading,
    error,
    fetchTrips,
    deleteTripById,
    createTrip,
  }
}
