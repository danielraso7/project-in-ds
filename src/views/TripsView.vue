<script setup>
import { RouterLink } from 'vue-router'
import { ref, onMounted, computed } from 'vue'
import TripsTable from '@/components/TripsTable.vue'
import { useCategory } from '@/composables/useCategory'
import { useFriend } from '@/composables/useFriend'

const { categories, fetchCategories } = useCategory()
const { friends, fetchFriends } = useFriend()

const searchQuery = ref('')
const filterOption = ref('none')
const sortOption = ref('date_desc')
const filteredTrips = ref([])

const totalTrips = computed(() => filteredTrips.value.length)

const totalTimeTravelled = computed(() => {
  const totalMinutes = filteredTrips.value.reduce((total, trip) => {
    const minutes = parseFloat(trip.duration ? trip.duration : 0)
    return total + minutes
  }, 0)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
})

const totalDistance = computed(() => {
  return filteredTrips.value.reduce((total, trip) => {
    const distance = parseFloat(trip.distance)
    return total + distance
  }, 0)
})

const friendWithMostTrips = computed(() => {
  const friendCounts = {}
  filteredTrips.value.forEach((trip) => {
    trip.friends.forEach((friend) => {
      if (!friendCounts[friend]) {
        friendCounts[friend] = 0
      }
      friendCounts[friend]++
    })
  })

  const maxTrips = Math.max(...Object.values(friendCounts))
  const mostTripsFriends = Object.keys(friendCounts).filter((friend) => friendCounts[friend] === maxTrips)

  // Convert usernames to first names
  const mostTripsFriendsFirstNames = mostTripsFriends.map((username) => {
    const friend = friends.value.find((f) => f.username === username)
    return friend ? friend.firstname : username
  })

  return mostTripsFriendsFirstNames.length != 0 ? mostTripsFriendsFirstNames.join(', ') : '-'
})

/* onMounted(fetchUserData) */
onMounted(async () => {
  await fetchCategories()
  await fetchFriends()
})
</script>

<template>
  <div class="d-sm-flex justify-content-between align-items-center mb-4">
    <h3 class="text-dark">Trips</h3>
    <div class="row align-items-center mt-2 mt-sm-0">
      <div class="col-12 col-md-3 mb-2 mb-md-0">
        <input type="text" class="form-control form-control-sm" v-model="searchQuery" placeholder="Search trips" />
      </div>
      <div class="col-6 col-md-3 mb-2 mb-md-0">
        <select id="filter" class="form-select form-select-sm" v-model="filterOption">
          <option selected value="none">Filters</option>
          <option v-for="category in categories" :key="'cat_' + category.id" :value="category.label">(C) {{ category.label }}</option>
          <option v-for="friend in friends" :key="'f_' + friend.id" :value="friend.username">(F) {{ friend.firstname }}</option>
        </select>
      </div>
      <div class="col-6 col-md-3 mb-2 mb-md-0">
        <select id="sorting" class="form-select form-select-sm" v-model="sortOption">
          <option selected value="date_desc">Newest (Date DESC)</option>
          <option value="date_asc">Oldest (Date ASC)</option>
          <option value="from_asc">From (ASC)</option>
          <option value="from_desc">From (DESC)</option>
          <option value="to_asc">To (ASC)</option>
          <option value="to_desc">To (DESC)</option>
          <option value="category_asc">Category (ASC)</option>
          <option value="category_desc">Category (DESC)</option>
          <option value="duration_asc">Duration (ASC)</option>
          <option value="duration_desc">Duration (DESC)</option>
          <option value="distance_asc">Distance (ASC)</option>
          <option value="distance_desc">Distance (DESC)</option>
          <option value="price_asc">Price (ASC)</option>
          <option value="price_desc">Price (DESC)</option>
        </select>
      </div>
      <div class="col-12 col-md-3 mb-md-0">
        <RouterLink class="btn btn-primary btn-sm no-wrap w-100" role="button" to="/trips/add">
          <i class="fa-solid fa-plus"></i>&nbsp;Add Trip
        </RouterLink>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-md-6 col-xl-3 mb-4">
      <div class="card shadow border-top-danger border-bottom-danger py-2">
        <div class="card-body">
          <div class="row g-0 align-items-center">
            <div class="col me-2">
              <div class="text-uppercase text-danger fw-bold text-xs mb-1"><span>Total Trips</span></div>
              <div class="text-dark fw-bold h5 mb-0">
                <span>{{ totalTrips }}</span>
              </div>
            </div>
            <div class="col-auto"><i class="fa-solid fa-suitcase-rolling fa-2x text-gray-300"></i></div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-xl-3 mb-4">
      <div class="card shadow border-top-warning border-bottom-warning py-2">
        <div class="card-body">
          <div class="row g-0 align-items-center">
            <div class="col me-2">
              <div class="text-uppercase text-warning fw-bold text-xs mb-1"><span>Time travelled</span></div>
              <div class="text-dark fw-bold h5 mb-0">
                <span>{{ totalTimeTravelled }} h</span>
              </div>
            </div>
            <div class="col-auto"><i class="fa-regular fa-clock fa-2x text-gray-300"></i></div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-xl-3 mb-4">
      <div class="card shadow border-top-warning border-bottom-warning py-2">
        <div class="card-body">
          <div class="row g-0 align-items-center">
            <div class="col me-2">
              <div class="text-uppercase text-warning fw-bold text-xs mb-1"><span>Total Distance</span></div>
              <div class="text-dark fw-bold h5 mb-0">
                <span>{{ totalDistance }} km</span>
              </div>
            </div>
            <div class="col-auto"><i class="fa-solid fa-route fa-2x text-gray-300"></i></div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-xl-3 mb-4">
      <div class="card shadow border-top-success border-bottom-success py-2">
        <div class="card-body">
          <div class="row g-0 align-items-center">
            <div class="col me-2">
              <div class="text-uppercase text-success fw-bold text-xs mb-1"><span>Travel Buddy</span></div>
              <div class="text-dark fw-bold h5 mb-0">
                <span>{{ friendWithMostTrips }}</span>
              </div>
            </div>
            <div class="col-auto"><i class="fa-regular fa-face-smile-wink fa-2x text-gray-300"></i></div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <TripsTable
    :searchQuery="searchQuery"
    :filterOption="filterOption"
    :sortOption="sortOption"
    :limit="100"
    @update:filteredTrips="filteredTrips = $event"
  />
</template>

<style lang="css" scoped>
.no-wrap {
  white-space: nowrap;
}

.border-left-primary {
  border-left: 0.25rem solid #4e73df !important;
}
.border-top-primary {
  border-top: 0.25rem solid #4e73df !important;
}
.border-left-secondary {
  border-left: 0.25rem solid #858796 !important;
}
.border-top-secondary {
  border-top: 0.25rem solid #858796 !important;
}
.border-left-success {
  border-left: 0.25rem solid #1cc88a !important;
}
.border-top-success {
  border-top: 0.25rem solid #1cc88a !important;
}
.border-left-info {
  border-left: 0.25rem solid #36b9cc !important;
}
.border-top-info {
  border-top: 0.25rem solid #36b9cc !important;
}
.border-left-warning {
  border-left: 0.25rem solid #f6c23e !important;
}
.border-top-warning {
  border-top: 0.25rem solid #f6c23e !important;
}
.border-left-danger {
  border-left: 0.25rem solid #e74a3b !important;
}
.border-top-danger {
  border-top: 0.25rem solid #e74a3b !important;
}
.border-left-light {
  border-left: 0.25rem solid #f8f9fc !important;
}
.border-top-light {
  border-top: 0.25rem solid #f8f9fc !important;
}
.border-left-dark {
  border-left: 0.25rem solid #3a3b45 !important;
}
.border-top-dark {
  border-top: 0.25rem solid #3a3b45 !important;
}
</style>
