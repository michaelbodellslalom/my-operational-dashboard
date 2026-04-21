<template>
  <v-card :color="metric.color" variant="flat" class="metric-card">
    <v-card-text>
      <div class="d-flex justify-space-between align-start mb-2">
        <v-icon :color="`${metric.color}-lighten-2`" size="40">{{ metric.icon }}</v-icon>
        <v-chip
          color="white"
          size="small"
          variant="flat"
          :class="metric.changeType === 'increase' ? 'trend-up' : 'trend-down'"
        >
          <v-icon start size="small" :color="metric.changeType === 'increase' ? 'success' : 'error'">
            {{ metric.changeType === 'increase' ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
          </v-icon>
          <span :style="{ color: metric.changeType === 'increase' ? '#4CAF50' : '#D64545' }">
            {{ Math.abs(metric.change) }}%
          </span>
        </v-chip>
      </div>

      <div class="text-h4 font-weight-bold text-white mb-1">
        {{ formatValue(metric.value) }}{{ metric.unit }}
      </div>

      <div class="text-subtitle-2 text-white">
        {{ metric.title }}
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        variant="text"
        color="white"
        size="small"
        @click="$emit('click', metric)"
      >
        View Details
        <v-icon end>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { Metric } from '../types/dashboard'

defineProps<{
  metric: Metric
}>()

defineEmits<{
  click: [metric: Metric]
}>()

const formatValue = (value: number): string => {
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'k'
  }
  return value.toString()
}
</script>

<style scoped>
.metric-card {
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.metric-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
}

.trend-up,
.trend-down {
  font-weight: 600;
}
</style>
