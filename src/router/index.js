import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '@/views/DashboardView.vue'
import TripsView from '@/views/TripsView.vue'
import GoalsView from '@/views/GoalsView.vue'
import AddTripView from '@/views/AddTripView.vue'
import AddGoalView from '@/views/AddGoalView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import MapView from '@/views/MapView.vue'
import SettingsView from '@/views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/trips',
      name: 'trips',
      component: TripsView,
    },
    {
      path: '/goals',
      name: 'goals',
      component: GoalsView,
    },
    {
      path: '/trips/add',
      name: 'add-trip',
      component: AddTripView,
    },
    {
      path: '/goals/add',
      name: 'add-goal',
      component: AddGoalView,
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
