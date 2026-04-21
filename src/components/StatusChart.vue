<template>
  <v-card class="d-flex flex-column" style="height: 100%;">
    <v-card-title class="d-flex align-center flex-shrink-0">
      <v-icon class="mr-2">mdi-chart-donut</v-icon>
      Status Distribution
    </v-card-title>
    <v-card-text class="flex-grow-1 d-flex flex-column">
      <div class="chart-container flex-shrink-0" style="max-height: 250px; max-width: 250px; margin: 0 auto;">
        <Doughnut :data="chartData" :options="chartOptions" />
      </div>
      <v-list dense class="mt-4 flex-shrink-0">
        <v-list-item
          v-for="item in statusData"
          :key="item.status"
          class="px-0"
        >
          <template v-slot:prepend>
            <v-avatar :color="item.color" size="12" class="mr-2"></v-avatar>
          </template>
          <v-list-item-title>{{ item.status }}</v-list-item-title>
          <template v-slot:append>
            <v-chip size="small">{{ item.count }}</v-chip>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions
} from 'chart.js'
import type { StatusData } from '../types/dashboard'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps<{
  statusData: StatusData[]
}>()

const chartData = computed(() => ({
  labels: props.statusData.map(item => item.status),
  datasets: [
    {
      data: props.statusData.map(item => item.count),
      backgroundColor: props.statusData.map(item => item.color),
      borderWidth: 2,
      borderColor: '#fff'
    }
  ]
}))

const chartOptions: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.label || ''
          const value = context.parsed || 0
          const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const percentage = ((value / total) * 100).toFixed(1)
          return `${label}: ${value} (${percentage}%)`
        }
      }
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
