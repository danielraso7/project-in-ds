<script setup>
import { ref, computed, watch } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
  totalTravelCost: Number,
  klimaticketCost: Number,
})

const percentage = computed(() => {
  return ((props.totalTravelCost / props.klimaticketCost) * 100).toFixed(2)
})

const chartOptions = ref({
  chart: {
    type: 'donut',
    height: 350,
  },
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 90,
      offsetY: 0,
      donut: {
        size: '70%',
        labels: {
          show: true,
          name: {
            show: true,
          },
          value: {
            show: true,
          },
          total: {
            show: true,
            label: 'Progress',
          },
        },
      },
    },
  },
  labels: ['Travel Cost', 'Remaining until Break-Even'],
  colors: ['#36A2EB', '#FF6384'],
  legend: {
    show: false,
  },
  tooltip: {
    enabled: true,
    y: {
      formatter: (val) => `${val}€`,
      title: {
        formatter: (seriesName) => null,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
})

const chartSeries = ref([props.totalTravelCost, props.klimaticketCost - props.totalTravelCost])

watch(
  () => [props.totalTravelCost, props.klimaticketCost],
  () => {
    chartSeries.value = [props.totalTravelCost, props.klimaticketCost - props.totalTravelCost]
    chartOptions.value.plotOptions.pie.donut.labels.value.formatter = (val) => `${((val / props.klimaticketCost) * 100).toFixed(2)}%`
    chartOptions.value.plotOptions.pie.donut.labels.total.formatter = () => `${percentage.value}% of ${props.klimaticketCost}€`
  },
  { immediate: true },
)
</script>

<template>
  <div class="break-even-chart">
    <VueApexCharts type="donut" :options="chartOptions" :series="chartSeries" />
    <div class="text-center put-top">
      <p>You did {{ totalTravelCost }}€ worth of travel</p>
    </div>
  </div>
</template>

<style scoped>
.break-even-chart {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: auto;
  height: 270px;
}
.put-top {
  margin-top: -120px;
}
</style>
