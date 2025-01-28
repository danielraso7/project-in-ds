import { defineStore } from 'pinia'
import railwayJunctionsJson from '@/data/RailwayJunction_2024.json'
import { ref, computed } from 'vue'

export const useStationsStore = defineStore('stations', () => {
  const stations = ref({})
  const initialized = ref(false)
  let matIdx = 0

  function initializeStations() {
    if (initialized.value) return

    for (let i = 0; i < railwayJunctionsJson.features.length; i++) {
      const e = railwayJunctionsJson.features[i].properties
      if (Object.hasOwnProperty.call(stations.value, e.NETEX_ID)) {
        // avoid duplicates
        /* console.log(i)
        console.log(e.NAME_SNNB)
        console.log(stations.value[e.NETEX_ID]) */
        continue
      }

      stations.value[e.NETEX_ID] = { name_snnb: e.NAME_SNNB, mat_idx: matIdx }

      matIdx++
    }
    console.log(stations.value)
    initialized.value = true
  }

  return {
    stations,
    initialized,
    initializeStations,
  }
})
