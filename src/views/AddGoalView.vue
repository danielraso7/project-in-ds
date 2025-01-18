<script setup>
import { ref, reactive, computed } from 'vue'
import FriendsCheckboxes from '@/components/FriendsCheckboxes.vue'
import CategoriesRadio from '@/components/CategoriesRadio.vue'
import SubmitButton from '@/components/SubmitButton.vue'

const goalTypes = ref([
  { id: 'type1', label: 'Coverage goal' },
  { id: 'type2', label: 'Quantitative goal' },
  { id: 'type3', label: 'Price target' },
  { id: 'type4', label: 'Predefined goals' },
])

const friends = ref([
  { id: 'formCheck-1', label: 'Friend 1', value: 'friend1' },
  { id: 'formCheck-2', label: 'Friend 2', value: 'friend2' },
  { id: 'formCheck-3', label: 'Friend 3', value: 'friend3' },
  { id: 'formCheck-4', label: 'Friend 4', value: 'friend4' },
])

const categories = ref([
  { id: 'defaultCat', label: 'Default', value: 'default', color: 'success' },
  { id: 'defaultCat-2', label: 'cat2', value: 'cat2', color: 'danger' },
  { id: 'defaultCat-1', label: 'cat4', value: 'cat4', color: 'warning' },
])

const formData = reactive({
  goalType: '',
  startDate: '',
  endDate: '',
  selectedFriends: [],
  selectedCategory: '',
  isPercentage: false,
  coverNumber: 0,
})

const handleSubmit = () => {
  // Handle form submission logic
  console.log('Form submitted', formData)
  // check if all required inputs are filled depending on the goal type here instead of adding "required" to the input fields
}

const isType1 = computed(() => formData.goalType === 'type1')
const isType2 = computed(() => formData.goalType === 'type2')
const isType3 = computed(() => formData.goalType === 'type3')
const isType4 = computed(() => formData.goalType === 'type4')
</script>

<template>
  <h3 class="text-dark mb-4">Add Goal</h3>
  <form @submit.prevent="handleSubmit" novalidate>
    <div class="row mb-5 justify-content-center">
      <label class="col-md-2 col-sm-3 col-form-label text-md-end" for="goalTypeSelect"><strong>Goal Type:</strong></label>
      <div class="col-md-3">
        <select v-model="formData.goalType" class="form-select" id="goalTypeSelect" required>
          <option value="" disabled>Select a goal type</option>
          <option v-for="type in goalTypes" :key="type.id" :value="type.id">{{ type.label }}</option>
        </select>
      </div>
    </div>

    <div v-if="isType1 || isType2 || isType3 || isType4">
      <div class="card shadow mb-4">
        <div class="card-header py-3">
          <h6 class="text-primary m-0 fw-bold">Goal Details</h6>
        </div>
        <div class="card-body">
          <div v-if="isType1">
            <div class="row justify-content-center">
              <div class="col-md-4 mb-3">
                <label class="form-label"><strong>How much (value mustn't exceed the total amount)?</strong></label>
                <div class="input-group">
                  <input v-model="formData.coverNumber" class="form-control" type="number" step="0.01" />
                  <div class="input-group-text">
                    <input type="checkbox" v-model="formData.isPercentage" class="d-none" id="togglePercentage" />
                    <label for="togglePercentage" class="m-0">
                      <i :class="formData.isPercentage ? 'fa-solid fa-hashtag' : 'fa-solid fa-percent'"></i>
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <label class="form-label"><strong>What?</strong></label
                ><select id="coverObject" class="form-select">
                  <option value="" selected disabled>pls select what you want to cover</option>
                  <option value="coverWhatId2">Stations</option>
                  <option value="coverWhatId1">Train Route Kilometres</option>
                </select>
              </div>
            </div>
          </div>
          <div v-if="isType2">
            <div class="row justify-content-center">
              <div class="col-md-4 mb-3">
                <label class="form-label"><strong>How many?</strong></label>
                <input v-model="formData.quantitativeNumber" class="form-control" type="number" />
              </div>
              <div class="col-md-4 mb-3">
                <label class="form-label"><strong>What?</strong></label
                ><select id="coverObject" class="form-select">
                  <option value="" selected disabled>pls select what you want to count</option>
                  <option value="coverWhatId2">Stations</option>
                  <option value="coverWhatId1">Train Route Kilometres</option>
                  <option value="coverWhatId3">Trips</option>
                </select>
              </div>
            </div>
          </div>

          <div class="row">
            <div v-if="isType1 || isType2" class="col-md-4 mb-3">
              <label class="form-label"><strong>Federal State</strong></label
              ><select id="predefinedGoal" class="form-select">
                <option value="" selected>-</option>
                <option value="goal1id">Upper Austria</option>
                <option value="goal2id">Vienna</option>
                <option value="goal3id">Styria</option>
              </select>
            </div>
            <div v-if="isType3" class="col-md-4 mb-3">
              <label class="form-label"><strong>Price</strong></label>
              <div class="input-group">
                <input class="form-control" type="number" step="0.01" placeholder="Enter price" /><span class="input-group-text"
                  ><i class="fa-solid fa-euro-sign"></i
                ></span>
              </div>
            </div>
            <div v-if="isType4" class="col-md-4 mb-3">
              <label class="form-label"><strong>Goal</strong></label
              ><select id="predefinedGoal" class="form-select">
                <option value="" selected disabled>pls select a predefined goal</option>
                <option value="goal1id">visit all federal states</option>
                <option value="goal2id">visit all state capitals</option>
                <option value="goal3id">visit capital city Vienna</option>
                <option value="goal4id">visit the north-/east-/south-/west-most station in Austria</option>
                <option value="goal5id">visit routes along rivers, lakes and mountains</option>
              </select>
            </div>
            <div class="col-md-4 mb-3">
              <label class="form-label"><strong>Start Date</strong></label>
              <input v-model="formData.startDate" class="form-control" type="date" />
            </div>
            <div class="col-md-4 mb-3">
              <label class="form-label"><strong>End Date</strong></label>
              <input v-model="formData.endDate" class="form-control" type="date" />
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
          <SubmitButton button-text="Add Goal" />
        </div>
      </div>
    </div>
  </form>
</template>

<style lang="css" scoped>
.input-group-text label {
  cursor: pointer;
}
</style>
