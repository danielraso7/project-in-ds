<script setup>
import { ref, reactive } from 'vue'
import FriendsCheckboxes from '@/components/FriendsCheckboxes.vue'
import CategoriesRadio from '@/components/CategoriesRadio.vue'
import SubmitButton from '@/components/SubmitButton.vue'

const friends = ref([
  { id: 'formCheck-1', label: 'Friend 1', value: 'friend1' },
  { id: 'formCheck-2', label: 'Friend 2', value: 'friend2' },
  { id: 'formCheck-3', label: 'Friend 3', value: 'friend3' },
  { id: 'formCheck-4', label: 'Friend 4', value: 'friend4' },
  { id: 'formCheck-5', label: 'Friend 5', value: 'friend5' },
])

const categories = ref([
  { id: 'defaultCat', label: 'Default', value: 'default', color: 'success' },
  { id: 'defaultCat-2', label: 'cat2', value: 'cat2', color: 'danger' },
  { id: 'defaultCat-1', label: 'cat4', value: 'cat4', color: 'warning' },
])

const formData = reactive({
  startDate: '',
  endDate: '',
  selectedFriends: [],
  selectedCategory: '',
})
</script>

<template>
  <h3 class="text-dark mb-4">Add Trip</h3>
  <div class="card shadow mb-4">
    <div class="card-header py-3">
      <h6 class="text-primary m-0 fw-bold">Trip Details</h6>
    </div>
    <div class="card-body">
      <form>
        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label"><strong>From</strong></label
            ><select id="fromCity" class="form-select" required>
              <option value="" selected disabled>pls select a city</option>
              <option value="city1id">city1</option>
              <option value="city2id">city2</option>
            </select>
          </div>
          <div class="col-md-6 mb-3">
            <label class="form-label"><strong>To</strong></label
            ><select id="toCity" class="form-select" required>
              <option value="" selected disabled>pls select a city</option>
              <option value="city1id">city1</option>
              <option value="city2id">city2</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <label class="form-label"><strong>Stops in between</strong></label
            ><textarea class="form-control" readonly placeholder="enter start and end station"></textarea>
          </div>
        </div>
        <div class="row">
          <div class="col mb-3">
            <label class="form-label"><strong>Description</strong></label
            ><input class="form-control" type="text" placeholder="Enter description" />
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 mb-3">
            <label class="form-label"><strong>Date</strong></label
            ><input class="form-control" type="date" required />
          </div>
          <div class="col mb-3">
            <label class="form-label"><strong>Duration</strong></label>
            <div class="input-group">
              <input class="form-control" type="number" placeholder="Enter travel time" /><span class="input-group-text">min</span>
            </div>
          </div>
          <div class="col mb-3">
            <label class="form-label"><strong>Distance</strong></label>
            <div class="input-group">
              <input class="form-control" type="number" readonly placeholder="enter start and end station" /><span class="input-group-text">km</span>
            </div>
          </div>
          <div class="col mb-3">
            <label class="form-label"><strong>Price</strong></label>
            <div class="input-group">
              <input class="form-control" type="number" step="0.01" placeholder="Enter price" /><span class="input-group-text"
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
