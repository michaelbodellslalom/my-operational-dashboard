<template>
  <div>
    <h2 class="text-h5 mb-4 d-flex align-center">
      <v-icon class="mr-2">mdi-chart-box</v-icon>
      Key Metrics
    </h2>
    <v-row>
      <v-col
        v-for="metric in metrics"
        :key="metric.id"
        cols="12"
        sm="6"
        md="3"
      >
        <MetricCard :metric="metric" @click="handleMetricClick" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import type { Metric } from '../types/dashboard'
import MetricCard from './MetricCard.vue'

defineProps<{
  metrics: Metric[]
}>()

const emit = defineEmits<{
  metricClick: [metric: Metric]
}>()

const handleMetricClick = (metric: Metric) => {
  emit('metricClick', metric)
}
</script>
