<template>
  <v-card :color="metric.color" variant="flat" class="metric-card">
    <v-card-text>
      <div class="d-flex justify-space-between align-start mb-2">
        <v-icon :color="`${metric.color}-lighten-2`" size="40">{{ metric.icon }}</v-icon>
        <v-chip
          :color="metric.trend === 'positive' ? 'success' : metric.trend === 'negative' ? 'error' : 'grey'"
          size="small"
          variant="flat"
        >
          <v-icon start size="small">
            {{ metric.changeType === 'increase' ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
          </v-icon>
          {{ Math.abs(metric.change) }}%
        </v-chip>
      </div>

      <div class="text-h4 font-weight-bold text-white mb-1">
        {{ formatValue(metric.value) }}{{ metric.unit }}
      </div>

      <div class="text-subtitle-2 text-white-darken-2">
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
</style>
