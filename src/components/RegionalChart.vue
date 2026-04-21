<template>
  <v-card class="d-flex flex-column" style="height: 100%;">
    <v-card-title class="d-flex align-center flex-shrink-0">
      <v-icon class="mr-2">mdi-chart-bar</v-icon>
      Regional Performance
    </v-card-title>
    <v-card-text class="flex-grow-1">
      <div class="chart-container" style="height: 100%;">
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions
} from 'chart.js'
import type { RegionalData } from '../types/dashboard'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const props = defineProps<{
  regionalData: RegionalData[]
}>()

const chartData = computed(() => ({
  labels: props.regionalData.map(item => item.region),
  datasets: [
    {
      label: 'Completed Cases',
      data: props.regionalData.map(item => item.completed),
      backgroundColor: '#4CAF50'
    },
    {
      label: 'Total Cases',
      data: props.regionalData.map(item => item.cases),
      backgroundColor: '#2196F3'
    },
    {
      label: 'Successful Outcomes',
      data: props.regionalData.map(item => item.successfulOutcomes),
      backgroundColor: '#9C27B0'
    }
  ]
}))

const chartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0
      }
    }
  },
  plugins: {
    legend: {
      position: 'top'
    },
    tooltip: {
      callbacks: {
        afterLabel: (context) => {
          if (context.datasetIndex === 0) {
            const regionData = props.regionalData[context.dataIndex]
            const successRate = ((regionData.completed / regionData.cases) * 100).toFixed(1)
            return `Completion Rate: ${successRate}%`
          }
          return ''
        }
      }
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 300px;
}
</style>
