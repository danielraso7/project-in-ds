<script setup>
import { onMounted } from 'vue'
import TripsTable from '@/components/TripsTable.vue'
import GoalsList from '@/components/GoalsList.vue'
import BreakEvenChart from '@/components/BreakEvenChart.vue'
import { useProfile } from '@/composables/useProfile'

const { klimaticketCost, totalTravelCost, fetchDashboardInfo } = useProfile()

onMounted(fetchDashboardInfo)
</script>

<template>
  <h3 class="text-dark mb-4">Dashboard</h3>

  <h5 class="text-dark mb-2">Break-Even Analysis</h5>
  <BreakEvenChart :totalTravelCost="totalTravelCost" :klimaticketCost="klimaticketCost" />

  <h5 class="text-dark mt-3 mb-2">Recent Trips</h5>
  <TripsTable />

  <h5 class="text-dark mt-5 mb-2">Fresh Goals</h5>
  <GoalsList />
</template>

<style lang="css" scoped></style>
