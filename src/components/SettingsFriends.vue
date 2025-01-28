<script setup>
import { ref, reactive, onMounted } from 'vue'
import SubmitButton from '@/components/SubmitButton.vue'
import { useFriend } from '@/composables/useFriend'

const { friends, loading, fetchFriends, addFriendByUsername, deleteFriendById } = useFriend()

const formData = reactive({
  username: '',
})

const handleAdd = async () => {
  const newFriend = {
    username: formData.username,
  }

  await addFriendByUsername(newFriend)

  formData.username = ''
}

const handleDelete = async (id) => {
  await deleteFriendById(id)
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
          <form @submit.prevent="handleAdd">
            <div class="mb-3">
              <label class="form-label" for="username"><strong>Username</strong></label>
              <input id="username" class="form-control" type="text" v-model="formData.username" placeholder="Enter username" required />
            </div>
            <SubmitButton button-text="Add Friend" :disabled="loading" />
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
          <div v-if="loading" class="text-center">Loading...</div>
          <div v-else id="dataTableGrid" class="table-responsive table" role="grid">
            <table class="table my-0">
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
                  <td>{{ friend.firstname }}</td>
                  <td>{{ friend.lastname }}</td>
                  <td>
                    <button class="btn btn-outline-danger btn-sm" @click="handleDelete(friend.id)">
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
  </div>
</template>
