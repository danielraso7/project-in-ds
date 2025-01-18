<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'
import GoalsList from '@/components/GoalsList.vue'

const filterOption = ref('none')
const sortOption = ref('progress_asc')
</script>

<template>
  <div class="d-sm-flex justify-content-between align-items-center mb-4">
    <h3 class="text-dark">Goals</h3>
    <div class="row align-items-center mt-2 mt-sm-0">
      <div class="col-6 col-md-4 mb-2 mb-md-0">
        <select id="filter" class="form-select form-select-sm" v-model="filterOption">
          <option selected value="none">Filters</option>
          <option value="active">Active</option>
          <option value="future">Future</option>
          <option value="past">Past</option>
          <option value="completed">Completed</option>
          <option value="not_completed">Not Completed</option>
        </select>
      </div>
      <div class="col-6 col-md-4 mb-2 mb-md-0">
        <select id="sorting" class="form-select form-select-sm" v-model="sortOption">
          <option value="progress_asc">Progress (ASC)</option>
          <option value="progress_desc">Progress (DESC)</option>
          <option value="goalType_asc">Goal Type</option>
          <option value="category_asc">Category (ASC)</option>
          <option value="category_desc">Category (DESC)</option>
          <option value="friend_asc">Friend (ASC)</option>
          <option value="friend_desc">Friend (DESC)</option>
        </select>
      </div>
      <div class="col-12 col-md-4 mb-md-0">
        <RouterLink class="btn btn-primary btn-sm no-wrap w-100" role="button" to="/goals/add"
          ><i class="fa-solid fa-plus"></i>&nbsp;Add Goal</RouterLink
        >
      </div>
    </div>
  </div>

  <GoalsList :filterOption="filterOption" :sortOption="sortOption" :limit="100" />
</template>

<style lang="css" scoped>
.no-wrap {
  white-space: nowrap;
}
</style>
