import { ref, computed } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
const backendUrl = import.meta.env.VITE_API_BASE_URL

export function useProfile() {
  const loading = ref(false)
  const error = ref(null)

  const toast = useToast()

  const klimaticketType = ref(false)
  const totalTravelCost = ref(0.0)
  const klimaticketCostClassic = ref(1095)
  const klimaticketCostSpecial = ref(821)

  const klimaticketCost = computed(() => {
    return klimaticketType.value ? klimaticketCostSpecial.value : klimaticketCostClassic.value
  })

  const fetchKlimaticketInfo = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get(`${backendUrl}/profile/klimaticket`)
      klimaticketType.value = response.data.klimaticketType == 1 ? true : false
      klimaticketCostClassic.value = response.data.klimaticketCostClassic
      klimaticketCostSpecial.value = response.data.klimaticketCostSpecial
    } catch (ex) {
      error.value = ex
      console.log(error.value)
      toast.error('Could not retrieve Klimaticket info. Please try again. ' + `${ex.response.data.message ? ex.response.data.message : ''}`)
    } finally {
      loading.value = false
    }
  }

  const updateKlimaticketType = async (typeBoolean) => {
    loading.value = true
    error.value = null

    try {
      await axios.put(`${backendUrl}/profile/klimaticket/${typeBoolean}`)
      await fetchKlimaticketInfo()
      toast.success('Type updated successfully.')
    } catch (ex) {
      error.value = ex
      toast.error('Could not update Klimaticket type. Please try again. ' + `${ex.response.data.message ? ex.response.data.message : ''}`)
    } finally {
      loading.value = false
    }
  }

  const fetchDashboardInfo = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get(`${backendUrl}/profile/dashboard`)
      totalTravelCost.value = response.data.totalTravelCost
      await fetchKlimaticketInfo()
    } catch (ex) {
      error.value = ex
      console.log(error.value)
      toast.error('Could not retrieve dashboard info. Please try again. ' + `${ex.response.data.message ? ex.response.data.message : ''}`)
    } finally {
      loading.value = false
    }
  }

  return {
    klimaticketType,
    klimaticketCost,
    klimaticketCostClassic,
    klimaticketCostSpecial,
    totalTravelCost,
    loading,
    error,
    fetchKlimaticketInfo,
    updateKlimaticketType,
    fetchDashboardInfo,
  }
}
