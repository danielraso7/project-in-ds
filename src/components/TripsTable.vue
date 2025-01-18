<script setup>
import { ref, computed, onMounted, watch } from 'vue'
// import { fetchTrips, deleteTripById } from '@/api/trips' // Assume you have API functions to fetch and delete trips

const props = defineProps({
  searchQuery: String,
  filterOption: String,
  sortOption: {
    type: String,
    default: 'date_desc',
  },
  limit: {
    type: Number,
    default: 5,
  },
})

const trips = ref([])
const loading = ref(false)
const tripDetails = ref({ stops: '', description: '', friends: '' })

const updateShownTripDetails = (stops, description, friends) => {
  tripDetails.value.stops = stops
  tripDetails.value.description = description
  tripDetails.value.friends = friends
}

const generateDummyTrips = () => {
  return {
    data: [
      {
        id: 1,
        from: 'New York',
        to: 'Los Angeles',
        date: '2023-01-01',
        duration: '515',
        distance: '4500',
        price: '300',
        category: 'Business',
        categoryColor: 'primary',
        stops: ['Chicago', 'Denver'],
        description: 'Business trip to LA',
        friends: ['Alice', 'Bob'],
      },
      {
        id: 2,
        from: 'San Francisco',
        to: 'Seattle',
        date: '2023-02-15',
        duration: '220',
        distance: '1300',
        price: '150',
        category: 'Leisure',
        categoryColor: 'success',
        stops: ['Portland'],
        description: 'Weekend getaway',
        friends: ['Charlie'],
      },
      // Add more dummy trips as needed
    ],
  }
}

const fetchTripsData = async () => {
  loading.value = true
  try {
    const response = generateDummyTrips() // await fetchTrips() // Fetch trips from the database
    trips.value = response.data
  } catch (error) {
    console.error('Error fetching trips:', error)
  } finally {
    loading.value = false
  }
}

const filteredTrips = computed(() => {
  let filtered = trips.value

  // Apply search query filter
  if (props.searchQuery) {
    const query = props.searchQuery.toLowerCase()
    filtered = filtered.filter(
      (trip) => trip.from.toLowerCase().includes(query) || trip.to.toLowerCase().includes(query) || trip.description.toLowerCase().includes(query),
    )
  }

  // Apply filter option
  if (props.filterOption && props.filterOption !== 'none') {
    filtered = filtered.filter((trip) => trip.category === props.filterOption || trip.friends.includes(props.filterOption))
  }

  // Apply sorting
  if (props.sortOption && props.sortOption !== 'none') {
    const [sortKey, sortOrder] = props.sortOption.split('_')
    filtered = filtered.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortKey] > b[sortKey] ? 1 : -1
      } else {
        return a[sortKey] < b[sortKey] ? 1 : -1
      }
    })
  }

  // Apply limit
  if (props.limit) {
    filtered = filtered.slice(0, props.limit)
  }

  return filtered
})

const emit = defineEmits(['update:filteredTrips'])

watch(filteredTrips, (newFilteredTrips) => {
  emit('update:filteredTrips', newFilteredTrips)
})

const deleteTrip = async (tripId) => {
  const confirmed = confirm('Are you sure you want to delete this trip?')

  if (confirmed) {
    try {
      await deleteTripById(tripId) // Delete trip by ID
      await fetchTripsData() // Reload trips data
    } catch (error) {
      console.error('Error deleting trip:', error)
    }
  }
}

onMounted(fetchTripsData)
// watch([props.searchQuery, props.filterOption, props.sortOption], fetchTripsData)
</script>

<template>
  <div class="card shadow">
    <div class="card-body">
      <div v-if="loading" class="text-center">Loading...</div>
      <div v-else id="dataTable" class="table-responsive table" role="grid">
        <table id="dataTable" class="table my-0">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Category</th>
              <th>Date</th>
              <th>Duration (min)</th>
              <th>Distance (km)</th>
              <th>Price (€)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="trip in filteredTrips" :key="trip.id">
              <td>{{ trip.from }}</td>
              <td>{{ trip.to }}</td>
              <td>
                <span :class="`badge bg-${trip.categoryColor}`">{{ trip.category }}</span>
              </td>
              <td>{{ trip.date }}</td>
              <td>{{ trip.duration }}</td>
              <td>{{ trip.distance }}</td>
              <td>{{ trip.price }}</td>

              <td>
                <button class="btn btn-outline-danger btn-sm me-2" @click="deleteTrip(trip.id)">
                  <i class="fa-solid fa-trash"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-info btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#tripDetails"
                  @click="updateShownTripDetails(trip.stops.join(', '), trip.description, trip.friends.join(', '))"
                >
                  <i class="fa-solid fa-info-circle"></i>
                </button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Category</th>
              <th>Date</th>
              <th>Duration (min)</th>
              <th>Distance (km)</th>
              <th>Price (€)</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>

  <div class="modal fade" id="tripDetails" tabindex="-1">
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text-dark">Trip Details</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <table class="table">
            <tbody>
              <tr>
                <th scope="row">Stops</th>
                <td>{{ tripDetails.stops }}</td>
              </tr>
              <tr>
                <th scope="row">Description</th>
                <td>{{ tripDetails.description }}</td>
              </tr>
              <tr>
                <th scope="row">Friends</th>
                <td>{{ tripDetails.friends }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styling here */
</style>
