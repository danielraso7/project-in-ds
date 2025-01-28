import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
const backendUrl = import.meta.env.VITE_API_BASE_URL

export function useFriend() {
  const loading = ref(false)
  const error = ref(null)

  const toast = useToast()

  const friends = ref([])

  const fetchFriends = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get(`${backendUrl}/friends`)
      friends.value = response.data
    } catch (ex) {
      error.value = ex
      toast.error('Could not retrieve friends. Please try again. ' + `${ex.response.data.message ? ex.response.data.message : ''}`)
    } finally {
      loading.value = false
    }
  }

  const deleteFriendById = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this friend?')
    if (!confirmed) return

    loading.value = true
    error.value = null

    try {
      await axios.delete(`${backendUrl}/friends/${id}`)
      await fetchFriends() // refresh friends after deletion
      toast.success('Friend deleted successfully.')
    } catch (ex) {
      error.value = ex
      toast.error('Could not delete friend. Please try again. ' + `${ex.response.data.message ? ex.response.data.message : ''}`)
    } finally {
      loading.value = false
    }
  }

  const addFriendByUsername = async (newFriend) => {
    loading.value = true
    error.value = null

    try {
      await axios.post(`${backendUrl}/friends`, newFriend)
      await fetchFriends()
      toast.success('Friend added successfully.')
    } catch (ex) {
      error.value = ex
      toast.error('Could not add friend. Please try again. ' + `${ex.response.data.message ? ex.response.data.message : ''}`)
    } finally {
      loading.value = false
    }
  }

  return {
    friends,
    loading,
    error,
    fetchFriends,
    deleteFriendById,
    addFriendByUsername,
  }
}
