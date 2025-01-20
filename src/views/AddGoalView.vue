<script setup>
import { ref, reactive, computed } from 'vue'
import { useToast } from 'vue-toastification'
import axios from 'axios'
import router from '@/router'
import FriendsCheckboxes from '@/components/FriendsCheckboxes.vue'
import CategoriesRadio from '@/components/CategoriesRadio.vue'
import SubmitButton from '@/components/SubmitButton.vue'

const goalTypes = ref([
  { id: 'cover', label: 'Coverage goal' },
  { id: 'quant', label: 'Quantitative goal' },
  { id: 'price', label: 'Price target' },
  { id: 'predef', label: 'Predefined goals' },
])

const isType1 = computed(() => formData.goalType === goalTypes.value[0].id)
const isType2 = computed(() => formData.goalType === goalTypes.value[1].id)
const isType3 = computed(() => formData.goalType === goalTypes.value[2].id)
const isType4 = computed(() => formData.goalType === goalTypes.value[3].id)

const coverCountObjects = ref([
  { id: 's', label: 'Stations', cover: true, count: true },
  { id: 'trk', label: 'Train Route Kilometres', cover: true, count: true },
  { id: 't', label: 'Trips', cover: false, count: true },
])

const coverObjects = computed(() => {
  return coverCountObjects.value.filter((obj) => obj.cover)
})

const countObjects = computed(() => {
  return coverCountObjects.value.filter((obj) => obj.count)
})

const states = ref([
  { id: 'V', label: 'Vienna' },
  { id: 'UA', label: 'Upper Austria' },
  { id: 'LA', label: 'Lower Austria' },
  { id: 'B', label: 'Burgenland' },
  { id: 'ST', label: 'Styria' },
  { id: 'C', label: 'Carinthia' },
  { id: 'S', label: 'Salzburg' },
  { id: 'T', label: 'Tyrol' },
  { id: 'VO', label: 'Vorarlberg' },
])

// TODO: retrieve from DB
const predefinedGoals = ref([
  { id: '1', label: 'visit all federal states' },
  { id: '2', label: 'visit all state capitals' },
  { id: '3', label: 'visit capital city Vienna' },
  { id: '4', label: 'visit the north-/east-/south-/west-most station in Austria' },
  { id: '5', label: 'visit routes along rivers, lakes and mountains' },
])

// TODO: retrieve from DB
const friends = ref([
  { id: 'formCheck-1', label: 'Friend 1', value: 'friend1' },
  { id: 'formCheck-2', label: 'Friend 2', value: 'friend2' },
  { id: 'formCheck-3', label: 'Friend 3', value: 'friend3' },
  { id: 'formCheck-4', label: 'Friend 4', value: 'friend4' },
])

// TODO: retrieve from DB
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
  isPercentage: true,
  coverNumber: 0,
  coverObject: '',
  countNumber: 0,
  countObject: '',
  federalState: 'AT',
  price: 0.0,
  predefinedGoal: '',
})

const toast = useToast()

const handleSubmit = async () => {
  const newGoal = {
    goalType: formData.goalType,
    startDate: formData.startDate,
    endDate: formData.endDate,
    selectedFriends: formData.selectedFriends,
    selectedCategory: formData.selectedCategory,
    isPercentage: formData.isPercentage,
    coverNumber: formData.coverNumber,
    coverObject: formData.coverObject,
    countNumber: formData.countNumber,
    countObject: formData.countObject,
    federalState: formData.federalState,
    price: formData.price,
    predefinedGoal: formData.predefinedGoal,
  }

  try {
    const response = await axios.post('/api/goal', newGoal)
    toast.success('Goal created successfully.')
    router.push('/goals')
  } catch (error) {
    console.error('Error creating goal: ', error)
    toast.error('Could not create goal. Please try again.')
  }
}
</script>

<template>
  <h3 class="text-dark mb-4">Add Goal</h3>
  <form @submit.prevent="handleSubmit">
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
                  <input v-model="formData.coverNumber" class="form-control" type="number" step="1" required />
                  <div class="input-group-text">
                    <input type="checkbox" v-model="formData.isPercentage" class="d-none" id="togglePercentage" required />
                    <label for="togglePercentage" class="m-0">
                      <i :class="formData.isPercentage ? 'fa-solid fa-percent' : 'fa-solid fa-hashtag'"></i>
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-md-4 mb-3">
                <label class="form-label"><strong>What?</strong></label
                ><select v-model="formData.coverObject" class="form-select" required>
                  <option value="" selected disabled>pls select what you want to cover</option>
                  <option v-for="obj in coverObjects" :key="obj.id" :value="obj.id">{{ obj.label }}</option>
                </select>
              </div>
            </div>
          </div>
          <div v-if="isType2">
            <div class="row justify-content-center">
              <div class="col-md-4 mb-3">
                <label class="form-label"><strong>How many?</strong></label>
                <input v-model="formData.countNumber" class="form-control" type="number" step="1" required />
              </div>
              <div class="col-md-4 mb-3">
                <label class="form-label"><strong>What?</strong></label
                ><select v-model="formData.countObject" class="form-select" required>
                  <option value="" selected disabled>pls select what you want to count</option>
                  <option v-for="obj in countObjects" :key="obj.id" :value="obj.id">{{ obj.label }}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="row">
            <div v-if="isType1 || isType2" class="col-md-4 mb-3">
              <label class="form-label"><strong>Federal State</strong></label
              ><select v-model="formData.federalState" class="form-select" required>
                <option value="AT" selected>none (Austria)</option>
                <option v-for="state in states" :key="state.id" :value="state.id">{{ state.label }}</option>
              </select>
            </div>
            <div v-if="isType3" class="col-md-4 mb-3">
              <label class="form-label"><strong>Price</strong></label>
              <div class="input-group">
                <input v-model="formData.price" class="form-control" type="number" step="0.01" placeholder="Enter price" required /><span
                  class="input-group-text"
                  ><i class="fa-solid fa-euro-sign"></i
                ></span>
              </div>
            </div>
            <div v-if="isType4" class="col-md-4 mb-3">
              <label class="form-label"><strong>Goal</strong></label
              ><select class="form-select" v-model="formData.predefinedGoal" required>
                <option value="" selected disabled>pls select a predefined goal</option>
                <option v-for="g in predefinedGoals" :key="g.id" :value="g.id">{{ g.label }}</option>
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
