<template>
  <v-card>
    <v-card-title class="d-flex align-center justify-space-between">
      <div class="d-flex align-center">
        <v-icon class="mr-2">mdi-alert-circle</v-icon>
        Active Issues ({{ exceptions.length }})
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
      <v-list>
        <v-list-item
          v-for="exception in exceptions"
          :key="exception.id"
          @click="handleExceptionClick(exception)"
          class="exception-item mb-2"
          :class="`severity-${exception.severity}`"
        >
          <template v-slot:prepend>
            <v-avatar :color="getSeverityColor(exception.severity)">
              <v-icon :icon="getTypeIcon(exception.type)" color="white"></v-icon>
            </v-avatar>
          </template>

          <v-list-item-title class="font-weight-bold">
            {{ exception.message }}
          </v-list-item-title>

          <v-list-item-subtitle class="mt-1">
            {{ exception.description }}
          </v-list-item-subtitle>

          <template v-slot:append>
            <div class="d-flex flex-column align-end">
              <v-chip
                :color="getStatusColor(exception.status)"
                size="small"
                variant="flat"
                class="mb-2"
              >
                {{ exception.status }}
              </v-chip>
              <div class="text-caption">{{ formatDate(exception.createdAt) }}</div>
            </div>
          </template>

          <div class="mt-2 d-flex gap-2">
            <v-chip size="x-small" variant="outlined">
              <v-icon start size="x-small">mdi-map-marker</v-icon>
              {{ exception.region }}
            </v-chip>
            <v-chip size="x-small" variant="outlined">
              <v-icon start size="x-small">mdi-folder-account</v-icon>
              {{ exception.caseId }}
            </v-chip>
            <v-chip v-if="exception.assignedTo" size="x-small" variant="outlined">
              <v-icon start size="x-small">mdi-account</v-icon>
              {{ exception.assignedTo }}
            </v-chip>
          </div>
        </v-list-item>

        <v-list-item v-if="exceptions.length === 0">
          <v-list-item-title class="text-center text-grey">
            No active issues
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { format } from 'date-fns'
import type { Exception } from '../types/dashboard'

const props = defineProps<{
  exceptions: Exception[]
}>()

const emit = defineEmits<{
  export: []
  viewDetails: [exception: Exception]
}>()

const getSeverityColor = (severity: string): string => {
  const colors: Record<string, string> = {
    critical: 'error',
    high: 'warning',
    medium: 'info',
    low: 'grey'
  }
  return colors[severity] || 'grey'
}

const getTypeIcon = (type: string): string => {
  const icons: Record<string, string> = {
    documentation: 'mdi-file-document-alert',
    eligibility: 'mdi-account-alert',
    'service-access': 'mdi-hospital-building',
    compliance: 'mdi-clipboard-check'
  }
  return icons[type] || 'mdi-alert-circle'
}

const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    open: 'error',
    investigating: 'warning',
    resolved: 'success'
  }
  return colors[status] || 'grey'
}

const formatDate = (date: Date): string => {
  return format(date, 'MMM dd, HH:mm')
}

const handleExport = () => {
  emit('export')
}

const handleExceptionClick = (exception: Exception) => {
  emit('viewDetails', exception)
}
</script>

<style scoped>
.exception-item {
  border-left: 4px solid transparent;
  transition: all 0.2s;
  cursor: pointer;
  border-radius: 4px;
  background-color: #f5f5f5;
}

.exception-item:hover {
  background-color: #eeeeee;
  transform: translateX(4px);
}

.exception-item.severity-critical {
  border-left-color: #f44336;
}

.exception-item.severity-high {
  border-left-color: #ff9800;
}

.exception-item.severity-medium {
  border-left-color: #2196f3;
}

.exception-item.severity-low {
  border-left-color: #9e9e9e;
}
</style>
