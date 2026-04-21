<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="3">
          <v-text-field
            v-model="localFilters.searchQuery"
            prepend-inner-icon="mdi-magnify"
            label="Search"
            variant="outlined"
            density="compact"
            clearable
            @update:model-value="emitFilters"
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            v-model="localFilters.status"
            :items="statusOptions"
            label="Status"
            variant="outlined"
            density="compact"
            multiple
            chips
            clearable
            @update:model-value="emitFilters"
          >
            <template v-slot:chip="{ item }">
              <v-chip size="small">{{ item.title }}</v-chip>
            </template>
          </v-select>
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            v-model="localFilters.regions"
            :items="regionOptions"
            label="Region"
            variant="outlined"
            density="compact"
            multiple
            chips
            clearable
            @update:model-value="emitFilters"
          >
            <template v-slot:chip="{ item }">
              <v-chip size="small">{{ item.title }}</v-chip>
            </template>
          </v-select>
        </v-col>

        <v-col cols="12" md="3">
          <v-select
            v-model="localFilters.priority"
            :items="priorityOptions"
            label="Priority"
            variant="outlined"
            density="compact"
            multiple
            chips
            clearable
            @update:model-value="emitFilters"
          >
            <template v-slot:chip="{ item }">
              <v-chip size="small">{{ item.title }}</v-chip>
            </template>
          </v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="d-flex align-center gap-2">
            <v-chip
              v-if="hasActiveFilters"
              color="primary"
              variant="flat"
              size="small"
            >
              {{ activeFilterCount }} filter(s) active
            </v-chip>
            <v-btn
              v-if="hasActiveFilters"
              color="error"
              variant="text"
              size="small"
              @click="clearAllFilters"
            >
              Clear All
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { DashboardFilters } from '../types/dashboard'
import { startOfDay, endOfDay } from 'date-fns'

const props = defineProps<{
  filters: DashboardFilters
}>()

const emit = defineEmits<{
  update: [filters: DashboardFilters]
  clear: []
}>()

const localFilters = ref<DashboardFilters>({ ...props.filters })

watch(() => props.filters, (newFilters) => {
  localFilters.value = { ...newFilters }
}, { deep: true })

const statusOptions = [
  { title: 'Open', value: 'open' },
  { title: 'Active', value: 'active' },
  { title: 'Completed', value: 'completed' },
  { title: 'Closed', value: 'closed' },
  { title: 'On Hold', value: 'on-hold' }
]

const regionOptions = [
  { title: 'Northeast', value: 'Northeast' },
  { title: 'Southeast', value: 'Southeast' },
  { title: 'Midwest', value: 'Midwest' },
  { title: 'West', value: 'West' },
  { title: 'Southwest', value: 'Southwest' }
]

const priorityOptions = [
  { title: 'Low', value: 'low' },
  { title: 'Medium', value: 'medium' },
  { title: 'High', value: 'high' },
  { title: 'Critical', value: 'critical' }
]

const hasActiveFilters = computed(() => {
  return localFilters.value.searchQuery ||
    localFilters.value.status.length > 0 ||
    localFilters.value.regions.length > 0 ||
    localFilters.value.priority.length > 0
})

const activeFilterCount = computed(() => {
  let count = 0
  if (localFilters.value.searchQuery) count++
  if (localFilters.value.status.length > 0) count++
  if (localFilters.value.regions.length > 0) count++
  if (localFilters.value.priority.length > 0) count++
  return count
})

const emitFilters = () => {
  emit('update', { ...localFilters.value })
}

const clearAllFilters = () => {
  localFilters.value = {
    dateRange: {
      start: startOfDay(new Date()),
      end: endOfDay(new Date())
    },
    status: [],
    regions: [],
    priority: [],
    searchQuery: ''
  }
  emit('clear')
}
</script>
