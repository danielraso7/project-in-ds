<script setup>
import { ref, reactive, computed } from 'vue'
import FriendsCheckboxes from '@/components/FriendsCheckboxes.vue'
import CategoriesRadio from '@/components/CategoriesRadio.vue'
import SubmitButton from '@/components/SubmitButton.vue'

// TODO: retrieve from DB
const friends = ref([
  { id: 'formCheck-1', label: 'Friend 1', value: 'friend1' },
  { id: 'formCheck-2', label: 'Friend 2', value: 'friend2' },
  { id: 'formCheck-3', label: 'Friend 3', value: 'friend3' },
  { id: 'formCheck-4', label: 'Friend 4', value: 'friend4' },
  { id: 'formCheck-5', label: 'Friend 5', value: 'friend5' },
])

// TODO: retrieve from DB
const categories = ref([
  { id: 'defaultCat', label: 'Default', value: 'default', color: 'success' },
  { id: 'defaultCat-2', label: 'cat2', value: 'cat2', color: 'danger' },
  { id: 'defaultCat-1', label: 'cat4', value: 'cat4', color: 'warning' },
])

// TODO: retrieve from DB
const stationsList = ref([
  { id: 1, name: 'Station 1' },
  { id: 2, name: 'Station 2' },
  { id: 3, name: 'Station 3' },
])

const formData = reactive({
  date: '',
  selectedFriends: [],
  selectedCategory: '',
  fromStation: '',
  toStation: '',
  stops: [],
  description: '',
  duration: null,
  distance: 0,
  price: null,
})

const stopsString = computed(() => {
  return formData.stops.join(' -> ')
})
// TODO: calculate stops based on selected stations
// TODO: calculate distance based on selected stations

const toast = useToast()

const handleSubmit = async () => {
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

  try {
    const response = await axios.post('/api/trip', newTrip)
    toast.success('Trip created successfully.')
    router.push('/trips')
  } catch (error) {
    console.error('Error creating trip: ', error)
    toast.error('Could not create trip. Please try again.')
  }
}
</script>

<template>
  <h3 class="text-dark mb-4">Add Trip</h3>
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h6 class="text-primary m-0 fw-bold">Trip Details</h6>
    </div>
    <div class="card-body">
      <form @submit.prevent="handleSubmit">
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label"><strong>From</strong></label
            ><select id="fromStation" class="form-select" v-model="formData.fromStation" required>
              <option value="" selected disabled>pls select starting station</option>
              <option v-for="station in stationsList" :key="station.id" :value="station.name">{{ station.name }}</option>
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label"><strong>To</strong></label
            ><select id="toStation" class="form-select" v-model="formData.toStation" :disabled="!formData.fromStation" required>
              <option value="" selected disabled>pls select end station</option>
              <option v-for="station in stationsList" :key="station.id" :value="station.name">{{ station.name }}</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <label class="form-label"><strong>Stops in between</strong></label
            ><textarea v-model="stopsString" class="form-control" readonly placeholder="Enter start and end station"></textarea>
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
