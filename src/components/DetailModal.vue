<template>
  <v-dialog v-model="dialog" max-width="800">
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between bg-primary">
        <div class="d-flex align-center text-white">
          <v-icon class="mr-2" color="white">{{ getIcon }}</v-icon>
          <span>{{ getTitle }}</span>
        </div>
        <v-btn icon="mdi-close" variant="text" color="white" @click="close"></v-btn>
      </v-card-title>

      <v-card-text class="mt-4">
        <div v-if="item && type === 'operation'">
          <!-- Case Details -->
          <v-row>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <div class="detail-label">Case ID</div>
                <div class="detail-value">{{ (item as Operation).caseId }}</div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <div class="detail-label">Client</div>
                <div class="detail-value">{{ (item as Operation).clientName }}</div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <div class="detail-label">Status</div>
                <v-chip :color="getStatusColor((item as Operation).status)">{{ (item as Operation).status }}</v-chip>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <div class="detail-label">Priority</div>
                <v-chip :color="getPriorityColor((item as Operation).priority)">{{ (item as Operation).priority }}</v-chip>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <div class="detail-label">Region</div>
                <div class="detail-value">{{ (item as Operation).region }}</div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <div class="detail-label">Program</div>
                <div class="detail-value">{{ (item as Operation).program }}</div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <div class="detail-label">Case Worker</div>
                <div class="detail-value">{{ (item as Operation).assignedTo }}</div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <div class="detail-label">Outcome Score</div>
                <div class="detail-value">{{ (item as Operation).outcomeScore || 'N/A' }}</div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="detail-item">
                <div class="detail-label">Progress</div>
                <v-progress-linear
                  :model-value="(item as Operation).progress"
                  :color="(item as Operation).progress === 100 ? 'success' : 'primary'"
                  height="20"
                  rounded
                >
                  <template v-slot:default>
                    <strong class="text-white">{{ (item as Operation).progress }}%</strong>
                  </template>
                </v-progress-linear>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <div class="detail-label">Created At</div>
                <div class="detail-value">{{ formatDate((item as Operation).createdAt) }}</div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <div class="detail-label">Updated At</div>
                <div class="detail-value">{{ formatDate((item as Operation).updatedAt) }}</div>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="detail-item">
                <div class="detail-label">Target Completion</div>
                <div class="detail-value">{{ formatDate((item as Operation).targetCompletion) }}</div>
              </div>
            </v-col>
          </v-row>
        </div>

        <div v-if="item && type === 'exception'">
          <!-- Issue Details -->
          <v-row>
            <v-col cols="12">
              <v-alert
                :color="getSeverityColor((item as Exception).severity)"
                prominent
              >
                <div class="text-h6">{{ (item as Exception).message }}</div>
                <div class="mt-2">{{ (item as Exception).description }}</div>
              </v-alert>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <div class="detail-label">Case ID</div>
                <div class="detail-value">{{ (item as Exception).caseId }}</div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <div class="detail-label">Issue Type</div>
                <v-chip :color="getSeverityColor((item as Exception).severity)">{{ (item as Exception).type }}</v-chip>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <div class="detail-label">Severity</div>
                <v-chip :color="getSeverityColor((item as Exception).severity)">{{ (item as Exception).severity }}</v-chip>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <div class="detail-label">Status</div>
                <v-chip :color="getExceptionStatusColor((item as Exception).status)">{{ (item as Exception).status }}</v-chip>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <div class="detail-label">Region</div>
                <div class="detail-value">{{ (item as Exception).region }}</div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <div class="detail-label">Created At</div>
                <div class="detail-value">{{ formatDate((item as Exception).createdAt) }}</div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <div class="detail-item">
                <div class="detail-label">Assigned To</div>
                <div class="detail-value">{{ (item as Exception).assignedTo || 'Unassigned' }}</div>
              </div>
            </v-col>
            <v-col v-if="(item as Exception).resolvedAt" cols="12">
              <div class="detail-item">
                <div class="detail-label">Resolved At</div>
                <div class="detail-value">{{ formatDate((item as Exception).resolvedAt!) }}</div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" variant="text" @click="close">Close</v-btn>
        <v-btn color="primary" variant="flat" @click="close">Take Action</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { format } from 'date-fns'
import type { Operation, Exception } from '../types/dashboard'

const props = defineProps<{
  modelValue: boolean
  item: Operation | Exception | null
  type: 'operation' | 'exception'
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const getIcon = computed(() => {
  return props.type === 'operation' ? 'mdi-folder-account' : 'mdi-alert-circle'
})

const getTitle = computed(() => {
  if (!props.item) return ''
  if (props.type === 'operation') {
    return `Case Details - ${(props.item as Operation).caseId}`
  }
  return `Issue Details - ${(props.item as Exception).caseId}`
})

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

const getSeverityColor = (severity: string): string => {
  const colors: Record<string, string> = {
    critical: 'error',
    high: 'warning',
    medium: 'info',
    low: 'grey'
  }
  return colors[severity] || 'grey'
}

const getExceptionStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    open: 'error',
    investigating: 'warning',
    resolved: 'success'
  }
  return colors[status] || 'grey'
}

const formatDate = (date: Date): string => {
  return format(date, 'MMM dd, yyyy HH:mm:ss')
}

const close = () => {
  dialog.value = false
}
</script>

<style scoped>
.detail-item {
  margin-bottom: 16px;
}

.detail-label {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 4px;
  font-weight: 500;
  text-transform: uppercase;
}

.detail-value {
  font-size: 1rem;
  font-weight: 500;
}
</style>
