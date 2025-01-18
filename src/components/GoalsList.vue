<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  filterOption: String,
  sortOption: {
    type: String,
    default: 'goalType',
  },
  limit: {
    type: Number,
    default: 3,
  },
})

const goals = ref([])
const loading = ref(false)

const generateDummyGoals = () => {
  return {
    data: [
      {
        id: 1,
        goalType: 'type1',
        description: 'Cover 12% of stations',
        startDate: '2023-01-01',
        endDate: '2023-02-02',
        federalState: 'Upper Austria',
        category: 'Business',
        categoryColor: 'primary',
        friends: ['Alice', 'Bob'],
        progress: 65,
      },
      {
        id: 2,
        goalType: 'type2',
        description: 'Do 50 trips',
        startDate: '2023-01-01',
        endDate: '',
        federalState: 'Austria',
        category: 'Business',
        categoryColor: 'primary',
        friends: ['Alice'],
        progress: 150,
      },
      {
        id: 3,
        goalType: 'type3',
        description: 'Travel for 50€ worth of ticket prices',
        startDate: '',
        endDate: '2029-02-02',
        federalState: 'Styria',
        category: 'Business',
        categoryColor: 'primary',
        friends: ['Bob'],
        progress: 5,
      },
      {
        id: 4,
        goalType: 'type4',
        description: 'Visit all state capitals',
        startDate: '2026-01-01',
        endDate: '2027-02-02',
        federalState: 'Austria',
        category: 'Default',
        categoryColor: 'success',
        friends: ['Peter', 'Max'],
        progress: 50,
      },
      {
        id: 5,
        goalType: 'type4',
        description: 'Visit Vienna',
        startDate: '2024-01-01',
        endDate: '2026-02-02',
        federalState: 'Austria',
        category: 'Default',
        categoryColor: 'success',
        friends: ['Peter', 'Max'],
        progress: 60,
      },
      // Add more dummy goals as needed
    ],
  }
}

const fetchGoalsData = async () => {
  loading.value = true
  try {
    const response = generateDummyGoals() // await fetchGoals() // Fetch goals from the database
    goals.value = response.data
  } catch (error) {
    console.error('Error fetching goals:', error)
  } finally {
    loading.value = false
  }
}

const filteredGoals = computed(() => {
  let filtered = goals.value

  // Apply filter option
  if (props.filterOption && props.filterOption !== 'none') {
    filtered = filtered.filter((goal) => {
      const today = new Date()
      const startDate = goal.startDate ? new Date(goal.startDate) : new Date(-8640000000000000) // Min date
      const endDate = goal.endDate ? new Date(goal.endDate) : new Date(8640000000000000) // Max date

      if (props.filterOption === 'active') {
        return today >= startDate && today <= endDate
      } else if (props.filterOption === 'future') {
        return today < startDate
      } else if (props.filterOption === 'past') {
        return today > endDate
      } else if (props.filterOption === 'completed') {
        return goal.progress >= 100
      } else if (props.filterOption === 'not_completed') {
        return goal.progress < 100
      }

      return true
    })
  }

  // Apply sorting
  if (props.sortOption && props.sortOption !== 'none') {
    const [sortKey, sortOrder] = props.sortOption.split('_')
    filtered = filtered.sort((a, b) => {
      if (sortKey === 'friend') {
        const aFriends = a.friends.join(', ')
        const bFriends = b.friends.join(', ')
        if (sortOrder === 'asc') {
          return aFriends > bFriends ? 1 : -1
        } else {
          return aFriends < bFriends ? 1 : -1
        }
      } else {
        if (sortOrder === 'asc') {
          return a[sortKey] > b[sortKey] ? 1 : -1
        } else {
          return a[sortKey] < b[sortKey] ? 1 : -1
        }
      }
    })
  }

  // Apply limit
  if (props.limit) {
    filtered = filtered.slice(0, props.limit)
  }

  return filtered
})

const goalTypeIcons = {
  type1: 'fa-percentage',
  type2: 'fa-hashtag',
  type3: 'fa-money-bill',
  type4: 'fa-list-check',
}

onMounted(fetchGoalsData)

/*
same as we did with Trips i want to make the GoalsView in a nice composition manner. The goal cards (i.e. the entire list) should be in a seperate component as i plan to show them somewhere else. The props will be the filterOption, sortOption and limit number. Default values for limit and sort. 
*/
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else class="row">
    <div v-for="goal in filteredGoals" :key="goal.id" class="col-md-6 col-xl-4 mb-4">
      <div
        :class="[
          `card shadow border-left-${goal.categoryColor} py-0`,
          { completed: goal.progress >= 100, notcompleted: goal.progress < 100 && new Date(goal.endDate) < new Date() },
        ]"
      >
        <div :class="['card-body', { past: new Date(goal.endDate) < new Date() }]">
          <div class="row g-0 align-items-center">
            <div class="col">
              <div class="text-uppercase text-dark font-monospace fw-bold text-sm mb-1">{{ goal.description }}</div>
              <div class="row g-0 align-items-center mb-2">
                <div class="col-auto">
                  <div class="text-dark fw-bold text-xs me-3"><i class="fa-solid fa-location-dot fa-sm"></i>&nbsp;{{ goal.federalState }}</div>
                </div>
                <div class="col">
                  <div class="text-dark fw-bold text-xs"><i class="fa-solid fa-user-group fa-sm"></i>&nbsp;{{ goal.friends.join(' ') }}</div>
                </div>
              </div>
              <div class="row g-0 align-items-center mb-2">
                <div class="col-auto">
                  <div class="text-dark fw-bold text-sm me-3">{{ goal.progress }}%</div>
                </div>
                <div class="col">
                  <div class="progress progress-sm">
                    <div class="progress-bar bg-danger" :style="{ width: goal.progress + '%' }"></div>
                  </div>
                </div>
              </div>
              <div class="text-dark fw-bold text-xs">
                <i class="fa-solid fa-calendar fa-sm"></i>&nbsp;&nbsp;{{ goal.startDate ? goal.startDate : '_' }} -
                {{ goal.endDate ? goal.endDate : '_' }}
              </div>
            </div>
            <div class=""><i :class="['fa-solid', goalTypeIcons[goal.goalType], 'fa-2x', 'text-gray-300', 'watermark-icon']"></i></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.watermark-icon {
  position: absolute;
  right: 10px;
  top: 10px;
  opacity: 0.75;
  z-index: 0;
  font-size: 3rem;
}
.card-body {
  position: relative;
  z-index: 1;
}
.past {
  opacity: 0.5;
}
.completed {
  box-shadow: 0 0.15rem 0.75rem 0 rgba(0, 255, 0, 0.5) !important;
}
.notcompleted {
  box-shadow: 0 0.15rem 0.75rem 0 rgba(255, 0, 0, 0.5) !important;
}
.border-left-primary {
  border-left: 0.4rem solid #4e73df !important;
}
.border-bottom-primary {
  border-bottom: 0.4rem solid #4e73df !important;
}
.border-left-secondary {
  border-left: 0.4rem solid #858796 !important;
}
.border-bottom-secondary {
  border-bottom: 0.4rem solid #858796 !important;
}
.border-left-success {
  border-left: 0.4rem solid #1cc88a !important;
}
.border-bottom-success {
  border-bottom: 0.4rem solid #1cc88a !important;
}
.border-left-info {
  border-left: 0.4rem solid #36b9cc !important;
}
.border-bottom-info {
  border-bottom: 0.4rem solid #36b9cc !important;
}
.border-left-warning {
  border-left: 0.4rem solid #f6c23e !important;
}
.border-bottom-warning {
  border-bottom: 0.4rem solid #f6c23e !important;
}
.border-left-danger {
  border-left: 0.4rem solid #e74a3b !important;
}
.border-bottom-danger {
  border-bottom: 0.4rem solid #e74a3b !important;
}
.border-left-light {
  border-left: 0.4rem solid #f8f9fc !important;
}
.border-bottom-light {
  border-bottom: 0.4rem solid #f8f9fc !important;
}
.border-left-dark {
  border-left: 0.4rem solid #3a3b45 !important;
}
.border-bottom-dark {
  border-bottom: 0.4rem solid #3a3b45 !important;
}
</style>
