<script setup>
import { ref, reactive, onMounted } from 'vue'
import SubmitButton from '@/components/SubmitButton.vue'

// Simulate fetching data from a database
const friends = ref([])
const newFriendUsername = ref('')
const loading = ref(false)

const fetchFriends = async () => {
  // Simulate an API call to fetch friends from the database
  friends.value = [
    { username: 'john_doe', firstName: 'John', lastName: 'Doe' },
    { username: 'jane_smith', firstName: 'Jane', lastName: 'Smith' },
    // Add more friends as needed
  ]
}

const addFriend = async () => {
  loading.value = true
  // Simulate an API call to add a friend by username
  const success = true // Replace with actual API call result
  if (success) {
    await fetchFriends() // Reload the friends list
    newFriendUsername.value = '' // Clear the input field
  } else {
    alert('Failed to add friend. Please try again.')
  }
  loading.value = false
}

const deleteFriend = async (username) => {
  const confirmed = confirm('Are you sure you want to break up with this friend?')
  if (confirmed) {
    // Simulate an API call to delete a friend by username
    const success = true // Replace with actual API call result
    if (success) {
      await fetchFriends() // Reload the friends list
    } else {
      alert('Failed to delete friend. Please try again.')
    }
  }
}

onMounted(fetchFriends)
</script>

<template>
  <div class="row mb-3">
    <div class="col-lg-5">
      <div class="card shadow mb-3">
        <div class="card-header py-3">
          <h6 class="text-primary m-0 fw-bold">Add Friend</h6>
        </div>
        <div class="card-body">
          <form @submit.prevent="addFriend">
            <div class="mb-3">
              <label class="form-label" for="username"><strong>Username</strong></label>
              <input id="username" class="form-control" type="text" v-model="newFriendUsername" placeholder="Enter username" required />
            </div>
            <SubmitButton button-text="Add" :disabled="loading" />
          </form>
        </div>
      </div>
    </div>
    <div class="col-lg-7">
      <div class="card shadow mb-3">
        <div class="card-header py-3">
          <h6 class="text-primary m-0 fw-bold">Friends List</h6>
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>Username</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="friend in friends" :key="friend.username">
                <td>{{ friend.username }}</td>
                <td>{{ friend.firstName }}</td>
                <td>{{ friend.lastName }}</td>
                <td>
                  <button class="btn btn-outline-danger btn-sm" @click="deleteFriend(friend.username)">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
