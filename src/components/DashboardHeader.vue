<template>
  <v-app-bar color="primary" prominent class="dashboard-header">
    <v-app-bar-title class="d-flex align-center">
      <v-icon size="32" class="mr-2" color="secondary">mdi-view-dashboard</v-icon>
      <div class="header-text">
        <div class="text-h6 font-weight-bold">Case Management</div>
        <div class="text-caption opacity-90 d-none d-sm-block">Public & Social Impact Services</div>
      </div>
    </v-app-bar-title>

    <template v-slot:append>
      <div class="d-flex align-center mr-4">
        <v-chip
          :color="autoRefresh ? 'secondary' : 'grey-darken-1'"
          variant="flat"
          class="mr-2"
        >
          <v-icon start>{{ autoRefresh ? 'mdi-sync' : 'mdi-sync-off' }}</v-icon>
          {{ autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF' }}
        </v-chip>
        
        <v-tooltip text="Last updated" location="bottom">
          <template v-slot:activator="{ props }">
            <v-chip v-bind="props" variant="outlined" color="white">
              <v-icon start>mdi-clock-outline</v-icon>
              {{ formatLastUpdate(lastRefresh) }}
            </v-chip>
          </template>
        </v-tooltip>
      </div>

      <v-btn
        icon="mdi-refresh"
        @click="$emit('refresh')"
        :loading="isLoading"
        color="white"
        variant="text"
      ></v-btn>

      <v-btn icon="mdi-cog" color="white" variant="text"></v-btn>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatDistanceToNow } from 'date-fns'

const props = defineProps<{
  lastRefresh: Date
  isLoading: boolean
  autoRefresh: boolean
}>()

defineEmits<{
  refresh: []
}>()

const formatLastUpdate = computed(() => (date: Date) => {
  return formatDistanceToNow(date, { addSuffix: true })
})
</script>

<style scoped>
.dashboard-header {
  background: linear-gradient(135deg, #003466 0%, #004d8c 100%) !important;
  box-shadow: 0 2px 8px rgba(0, 52, 102, 0.3);
}

.header-text {
  line-height: 1.3;
  max-width: 280px;
}

@media (max-width: 600px) {
  .header-text {
    max-width: 180px;
  }
}
</style>
