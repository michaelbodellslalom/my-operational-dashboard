<template>
  <v-card>
    <v-card-title class="d-flex align-center justify-space-between">
      <div class="d-flex align-center">
        <v-icon class="mr-2">mdi-table</v-icon>
        Cases ({{ operations.length }})
      </div>
      <v-btn
        color="success"
        variant="flat"
        prepend-icon="mdi-download"
        @click="handleExport"
      >
        Export CSV
      </v-btn>
    </v-card-title>

    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="operations"
        :items-per-page="10"
        class="elevation-0"
        @click:row="handleRowClick"
      >
        <template v-slot:item.status="{ item }">
          <v-chip
            :color="getStatusColor(item.status)"
            size="small"
            variant="flat"
          >
            {{ item.status }}
          </v-chip>
        </template>

        <template v-slot:item.priority="{ item }">
          <v-chip
            :color="getPriorityColor(item.priority)"
            size="small"
            variant="outlined"
          >
            {{ item.priority }}
          </v-chip>
        </template>

        <template v-slot:item.progress="{ item }">
          <div class="d-flex align-center">
            <v-progress-linear
              :model-value="item.progress"
              :color="item.progress === 100 ? 'success' : 'primary'"
              height="8"
              rounded
              class="mr-2"
              style="width: 100px;"
            ></v-progress-linear>
            <span class="text-caption">{{ item.progress }}%</span>
          </div>
        </template>

        <template v-slot:item.createdAt="{ item }">
          {{ formatDate(item.createdAt) }}
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn
            icon="mdi-eye"
            size="small"
            variant="text"
            @click.stop="handleRowClick(null, { item })"
          ></v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import type { Operation } from '../types/dashboard'

const props = defineProps<{
  operations: Operation[]
}>()

const emit = defineEmits<{
  export: []
  viewDetails: [operation: Operation]
}>()

const headers = [
  { title: 'Case ID', key: 'caseId', sortable: true },
  { title: 'Client', key: 'clientName', sortable: true },
  { title: 'Status', key: 'status', sortable: true },
  { title: 'Priority', key: 'priority', sortable: true },
  { title: 'Region', key: 'region', sortable: true },
  { title: 'Case Worker', key: 'assignedTo', sortable: true },
  { title: 'Progress', key: 'progress', sortable: true },
  { title: 'Created', key: 'createdAt', sortable: true },
  { title: 'Actions', key: 'actions', sortable: false, align: 'center' as const }
]

const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    open: 'warning',
    active: 'info',
    completed: 'success',
    closed: 'grey',
    'on-hold': 'orange'
  }
  return colors[status] || 'grey'
}

const getPriorityColor = (priority: string): string => {
  const colors: Record<string, string> = {
    low: 'grey',
    medium: 'info',
    high: 'warning',
    critical: 'error'
  }
  return colors[priority] || 'grey'
}

const formatDate = (date: Date): string => {
  return format(date, 'MMM dd, HH:mm')
}

const handleExport = () => {
  emit('export')
}

const handleRowClick = (_event: any, row: { item: Operation }) => {
  emit('viewDetails', row.item)
}
</script>

<style scoped>
:deep(.v-data-table tbody tr) {
  cursor: pointer;
}

:deep(.v-data-table tbody tr:hover) {
  background-color: rgba(0, 0, 0, 0.02);
}
</style>
