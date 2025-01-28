<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import FriendsCheckboxes from '@/components/FriendsCheckboxes.vue'
import CategoriesRadio from '@/components/CategoriesRadio.vue'
import SubmitButton from '@/components/SubmitButton.vue'
import { useTrips } from '@/composables/useTrips'
import { useCategory } from '@/composables/useCategory'
import { useFriend } from '@/composables/useFriend'
import { useStationsStore } from '@/stores/stations'

const { createTrip } = useTrips()
const { categories, fetchCategories } = useCategory()
const { friends, fetchFriends } = useFriend()
const stationsStore = useStationsStore()

const formData = reactive({
  date: '',
  selectedFriends: [],
  selectedCategory: null,
  fromStation: '',
  toStation: '',
  stops: [],
  description: '',
  duration: null,
  distance: 0,
  price: null,
})

watch(
  () => [formData.fromStation, formData.toStation],
  ([newFromStation, newToStation]) => {
    if (newFromStation && newToStation) {
      fillStops()
      formData.distance = Math.floor(Math.random() * 100) + 1
    }
  },
)

const fillStops = () => {
  const stationKeys = Object.keys(stationsStore.stations)
  const randomAmount = Math.floor(Math.random() * 5) + 2 // Random number between 2 and 6
  const shuffledKeys = stationKeys.sort(() => 0.5 - Math.random()) // Shuffle the keys
  formData.stops = shuffledKeys.slice(0, randomAmount) // Select the first randomCount keys
}

const stopsString = computed(() => {
  if (!formData.stops.length) return 'Enter start and end station'
  return formData.stops.map((netex_id) => stationsStore.stations[netex_id].name_snnb).join(' <i class="fa-solid fa-right-long"></i> ')
})
// TODO: calculate stops based on selected stations
// TODO: calculate distance based on selected stations

const handleCreate = async () => {
  const newTrip = {
    date: formData.date,
    selectedFriends: formData.selectedFriends,
    selectedCategory: formData.selectedCategory,
    fromStation: formData.fromStation,
    toStation: formData.toStation,
    stops: formData.stops,
    description: formData.description,
    duration: formData.duration,
    distance: formData.distance,
    price: formData.price,
  }
  await createTrip(newTrip)
}

onMounted(async () => {
  stationsStore.initializeStations()
  await fetchCategories()
  await fetchFriends()
})
</script>

<template>
  <h3 class="text-dark mb-4">Add Trip</h3>
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h6 class="text-primary m-0 fw-bold">Trip Details</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="handleCreate">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label"><strong>From</strong></label
            ><select id="fromStation" class="form-select" v-model="formData.fromStation" required>
              <option value="" selected disabled>pls select starting station</option>
              <option v-for="(val, netex_id) in stationsStore.stations" :key="netex_id" :value="netex_id">{{ val.name_snnb }}</option>
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label"><strong>To</strong></label
            ><select id="toStation" class="form-select" v-model="formData.toStation" :disabled="!formData.fromStation" required>
              <option value="" selected disabled>pls select end station</option>
              <option v-for="(val, netex_id) in stationsStore.stations" :key="netex_id" :value="netex_id">{{ val.name_snnb }}</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <label class="form-label"><strong>Stops in between</strong></label>
            <div v-html="stopsString" class="form-control"></div>
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <label class="form-label"><strong>Description</strong></label
            ><input class="form-control" type="text" placeholder="Enter description" v-model="formData.description" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mb-3">
            <label class="form-label"><strong>Date</strong></label
            ><input class="form-control" type="date" v-model="formData.date" required />
          </div>
          <div class="col mb-3">
            <label class="form-label"><strong>Duration</strong></label>
            <div class="input-group">
              <input class="form-control" type="number" placeholder="Enter travel time" v-model="formData.duration" /><span class="input-group-text"
                >min</span
              >
            </div>
          </div>
          <div class="col mb-3">
            <label class="form-label"><strong>Distance</strong></label>
            <div class="input-group">
              <input
                class="form-control"
                type="number"
                readonly
                placeholder="Enter start and end station"
                v-model="formData.distance"
                required
              /><span class="input-group-text">km</span>
            </div>
          </div>
          <div class="col mb-3">
            <label class="form-label"><strong>Price</strong></label>
            <div class="input-group">
              <input class="form-control" type="number" step="0.01" placeholder="Enter price" v-model="formData.price" /><span
                class="input-group-text"
                ><i class="fa-solid fa-euro-sign"></i
              ></span>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 mb-3">
            <CategoriesRadio :categories="categories" v-model:selected-category="formData.selectedCategory" />
          </div>
          <div class="col mb-3">
            <FriendsCheckboxes :friends="friends" v-model:selected-friends="formData.selectedFriends" />
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <div>
              <a
                class="btn btn-outline-primary"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls="collapseMap"
                href="#collapseMap"
                role="button"
                >Show Map</a
              >
              <div id="collapseMap" class="collapse">
                <svg>Collapse content.</svg>
              </div>
            </div>
          </div>
        </div>
        <SubmitButton button-text="Add Trip" />
      </form>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
