<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useTrips } from '@/composables/useTrips'
import { useStationsStore } from '@/stores/stations'
import { useFriend } from '@/composables/useFriend'

const { friends, fetchFriends } = useFriend()
const { trips, loading, fetchTrips, deleteTripById } = useTrips()
const stationsStore = useStationsStore()

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

const tripDetails = ref({ stops: [], description: '', friends: '' })

const updateShownTripDetails = (stops, description, friendsUsernames) => {
  tripDetails.value.stops = stops.map((netex_id) => stationsStore.stations[netex_id].name_snnb)
  tripDetails.value.description = description
  tripDetails.value.friends = friendsUsernames
    .map((username) => {
      const friend = friends.value.find((f) => f.username === username)
      return friend ? friend.firstname : username
    })
    .join(', ')
}

const stopsWithIcons = computed(() => {
  return tripDetails.value.stops
    .map((stop, index) => {
      if (index < tripDetails.value.stops.length - 1) {
        return `${stop} <i class="fa-solid fa-right-long"></i>`
      } else {
        return stop
      }
    })
    .join(' ')
})

const filteredTrips = computed(() => {
  let filtered = trips.value

  // apply search query filter
  if (props.searchQuery) {
    const query = props.searchQuery.toLowerCase()
    filtered = filtered.filter(
      (trip) =>
        stationsStore.stations[trip.from].name_snnb.toLowerCase().includes(query) ||
        stationsStore.stations[trip.to].name_snnb.toLowerCase().includes(query) ||
        trip.description.toLowerCase().includes(query),
    )
  }

  // apply filter option
  if (props.filterOption && props.filterOption !== 'none') {
    filtered = filtered.filter((trip) => trip.category === props.filterOption || trip.friends.includes(props.filterOption))
  }

  // apply sorting
  if (props.sortOption && props.sortOption !== 'none') {
    const [sortKey, sortOrder] = props.sortOption.split('_')
    filtered = filtered.sort((a, b) => {
      let aFinal, bFinal
      if (sortKey === 'from' || sortKey === 'to') {
        aFinal = stationsStore.stations[a[sortKey]].name_snnb
        bFinal = stationsStore.stations[b[sortKey]].name_snnb
      } else if (sortKey === 'category') {
        aFinal = a[sortKey].toLowerCase()
        bFinal = b[sortKey].toLowerCase()
      } else {
        aFinal = a[sortKey]
        bFinal = b[sortKey]
      }

      if (sortOrder === 'asc') {
        return aFinal > bFinal ? 1 : -1
      } else {
        return aFinal < bFinal ? 1 : -1
      }
    })
  }

  // apply limit
  if (props.limit) {
    filtered = filtered.slice(0, props.limit)
  }

  return filtered
})

const emit = defineEmits(['update:filteredTrips'])

watch(filteredTrips, (newFilteredTrips) => {
  emit('update:filteredTrips', newFilteredTrips)
})

const handleDelete = async (id) => {
  await deleteTripById(id)
}

onMounted(async () => {
  stationsStore.initializeStations()
  await fetchTrips()
  await fetchFriends()
})
// watch([props.searchQuery, props.filterOption, props.sortOption], fetchTripsData)
</script>

<template>
  <div class="card shadow">
    <div class="card-body">
      <div v-if="loading" class="text-center">Loading...</div>
      <div v-else id="dataTableGrid" class="table-responsive table" role="grid">
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
              <td>{{ stationsStore.stations[trip.from].name_snnb }}</td>
              <td>{{ stationsStore.stations[trip.to].name_snnb }}</td>
              <td>
                <span :class="`badge bg-${trip.categoryColor}`">{{ trip.category }}</span>
              </td>
              <td>{{ trip.date }}</td>
              <td>{{ trip.duration }}</td>
              <td>{{ trip.distance }}</td>
              <td>{{ trip.price }}</td>

              <td>
                <button class="btn btn-outline-danger btn-sm me-2" @click="handleDelete(trip.id)">
                  <i class="fa-solid fa-trash"></i>
                </button>
                <button
                  type="button"
                  class="btn btn-outline-info btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#tripDetails"
                  @click="updateShownTripDetails(trip.stops, trip.description, trip.friends)"
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
              <th>Actions</th>
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
                <td>
                  <div v-html="stopsWithIcons"></div>
                  <!-- {{ tripDetails.stops }} -->
                </td>
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
