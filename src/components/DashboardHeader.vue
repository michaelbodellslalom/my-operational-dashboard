<template>
  <v-app-bar color="primary" prominent>
    <v-app-bar-title class="d-flex align-center">
      <v-icon size="large" class="mr-2">mdi-view-dashboard</v-icon>
      <div>
        <div class="text-h5">Case Management Dashboard</div>
        <div class="text-caption">Public & Social Impact Services</div>
      </div>
    </v-app-bar-title>

    <template v-slot:append>
      <div class="d-flex align-center mr-4">
        <v-chip
          :color="autoRefresh ? 'success' : 'grey'"
          variant="flat"
          class="mr-2"
        >
          <v-icon start>{{ autoRefresh ? 'mdi-sync' : 'mdi-sync-off' }}</v-icon>
          {{ autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF' }}
        </v-chip>
        
        <v-tooltip text="Last updated" location="bottom">
          <template v-slot:activator="{ props }">
            <v-chip v-bind="props" variant="outlined">
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
      ></v-btn>

      <v-btn icon="mdi-cog"></v-btn>
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
