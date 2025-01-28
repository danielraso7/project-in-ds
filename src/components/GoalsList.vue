<script setup>
import { ref, computed, onMounted } from 'vue'
import { useGoals } from '@/composables/useGoals'
import { useFriend } from '@/composables/useFriend'

const { friends, fetchFriends } = useFriend()
const { goals, loading, fetchGoals } = useGoals()

const props = defineProps({
  filterOption: {
    type: String,
    default: 'active',
  },
  sortOption: {
    type: String,
    default: 'progress_asc',
  },
  limit: {
    type: Number,
    default: 3,
  },
})

const today = new Date()

const filteredGoals = computed(() => {
  let filtered = goals.value

  // apply filter option
  if (props.filterOption && props.filterOption !== 'none') {
    filtered = filtered.filter((goal) => {
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

  // apply sorting
  if (props.sortOption && props.sortOption !== 'none') {
    const [sortKey, sortOrder] = props.sortOption.split('_')
    filtered = filtered.sort((a, b) => {
      let aFinal, bFinal
      if (sortKey === 'friend') {
        aFinal = a.friends
          .map((username) => {
            const friend = friends.value.find((f) => f.username === username)
            return friend ? friend.firstname : username
          })
          .sort()
          .join(', ')
        bFinal = b.friends
          .map((username) => {
            const friend = friends.value.find((f) => f.username === username)
            return friend ? friend.firstname : username
          })
          .sort()
          .join(', ')
      } else if (sortKey === 'category') {
        aFinal = a[sortKey].toLowerCase()
        bFinal = b[sortKey].toLowerCase()
      } else {
        aFinal = a[sortKey]
        bFinal = b[sortKey]
      }

      if (sortOrder === 'asc') {
        return aFinal > bFinal ? 1 : -1
      } else {
        return aFinal < bFinal ? 1 : -1
      }
    })
  }

  // apply limit
  if (props.limit) {
    filtered = filtered.slice(0, props.limit)
  }

  return filtered
})

// TODO: retrieve from the database
const goalTypeIcons = {
  cover: 'fa-percentage',
  quant: 'fa-hashtag',
  price: 'fa-money-bill',
  predef: 'fa-list-check',
}

onMounted(async () => {
  await fetchFriends()
  await fetchGoals()
})
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else class="row">
    <div v-for="goal in filteredGoals" :key="goal.id" class="col-md-6 col-xl-4 mb-4">
      <div
        :class="[
          `card shadow border-left-${goal.categoryColor} py-0`,
          { completed: goal.progress >= 100, notcompleted: goal.progress < 100 && goal.endDate && new Date(goal.endDate) < today },
        ]"
      >
        <div :class="['card-body', { past: goal.endDate && new Date(goal.endDate) < today }]">
          <div class="row g-0 align-items-center">
            <div class="col">
              <div class="text-uppercase text-dark font-monospace fw-bold text-sm mb-1">{{ goal.description }}</div>
              <div class="row g-0 align-items-center mb-2">
                <div class="col-auto">
                  <div class="text-dark fw-bold text-xs me-3"><i class="fa-solid fa-location-dot fa-sm"></i>&nbsp;{{ goal.federalState }}</div>
                </div>
                <div class="col">
                  <div class="text-dark fw-bold text-xs">
                    <i class="fa-solid fa-user-group fa-sm"></i>&nbsp;{{
                      goal.friends
                        .map((username) => {
                          const friend = friends.find((f) => f.username === username)
                          return friend ? friend.firstname : username
                        })
                        .sort()
                        .join(', ')
                    }}
                  </div>
                </div>
              </div>
              <div class="row g-0 align-items-center mb-2">
                <div class="col-auto">
                  <div class="text-dark fw-bold text-sm me-3">{{ goal.progress }}%</div>
                </div>
                <div class="col">
                  <div class="progress progress-sm w-80">
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
.w-80 {
  width: 80% !important;
}
.watermark-icon {
  position: absolute;
  right: 10px;
  bottom: 5px;
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
