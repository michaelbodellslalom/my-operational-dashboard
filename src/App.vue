<template>
  <v-app>
    <DashboardHeader
      :last-refresh="lastRefresh"
      :is-loading="isLoading"
      :auto-refresh="autoRefresh"
      @refresh="refreshData"
    />

    <v-main class="bg-grey-lighten-4">
      <v-container fluid class="pa-6">
        <!-- Metrics Overview -->
        <MetricsOverview
          :metrics="dashboardData.metrics"
          @metric-click="handleMetricClick"
          class="mb-6"
        />

        <!-- Charts Row -->
        <v-row class="mb-6">
          <v-col cols="12" md="6">
            <StatusChart :status-data="dashboardData.statusData" />
          </v-col>
          <v-col cols="12" md="6">
            <RegionalChart :regional-data="dashboardData.regionalData" />
          </v-col>
        </v-row>

        <!-- Operations Table -->
        <OperationsTable
          :operations="filteredOperations"
          @export="exportOperations"
          @view-details="showOperationDetails"
          class="mb-6"
        />

        <!-- Exceptions List -->
        <ExceptionsTable
          :exceptions="filteredExceptions"
          @export="exportExceptions"
          @view-details="showExceptionDetails"
        />

        <!-- Detail Modal -->
        <DetailModal
          v-model="detailDialog"
          :item="selectedItem"
          :type="selectedType"
        />

        <!-- Metric Details Modal -->
        <v-dialog v-model="metricDialog" max-width="600">
          <v-card v-if="selectedMetric">
            <v-card-title class="d-flex align-center justify-space-between bg-primary text-white">
              <div class="d-flex align-center">
                <v-icon class="mr-2" color="white">{{ selectedMetric.icon }}</v-icon>
                <span>{{ selectedMetric.title }}</span>
              </div>
              <v-btn icon="mdi-close" variant="text" color="white" @click="metricDialog = false"></v-btn>
            </v-card-title>
            
            <v-card-text class="mt-4">
              <div class="text-center mb-4">
                <div class="text-h2 font-weight-bold" :style="{ color: selectedMetric.color }">
                  {{ selectedMetric.value }}{{ selectedMetric.unit }}
                </div>
                <div class="text-subtitle-1 text-grey mt-2">{{ selectedMetric.title }}</div>
              </div>

              <v-divider class="my-4"></v-divider>

              <v-row>
                <v-col cols="12">
                  <div class="d-flex align-center justify-center mb-3">
                    <v-chip
                      :color="selectedMetric.trend === 'positive' ? 'success' : selectedMetric.trend === 'negative' ? 'error' : 'grey'"
                      size="large"
                    >
                      <v-icon start>
                        {{ selectedMetric.changeType === 'increase' ? 'mdi-arrow-up' : 'mdi-arrow-down' }}
                      </v-icon>
                      {{ Math.abs(selectedMetric.change) }}% {{ selectedMetric.changeType === 'increase' ? 'increase' : 'decrease' }}
                    </v-chip>
                  </div>
                </v-col>
                <v-col cols="12">
                  <v-alert
                    :color="selectedMetric.trend === 'positive' ? 'success' : selectedMetric.trend === 'negative' ? 'error' : 'info'"
                    variant="tonal"
                  >
                    <div class="text-body-1">
                      <strong>Trend:</strong> {{ selectedMetric.trend === 'positive' ? 'Positive' : selectedMetric.trend === 'negative' ? 'Negative' : 'Neutral' }}
                    </div>
                    <div class="text-body-2 mt-2">
                      This metric has {{ selectedMetric.changeType === 'increase' ? 'increased' : 'decreased' }} by 
                      <strong>{{ Math.abs(selectedMetric.change) }}%</strong> compared to the previous period.
                    </div>
                  </v-alert>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey" variant="text" @click="metricDialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useDashboard } from './composables/useDashboard'
import type { Operation, Exception, Metric } from './types/dashboard'

import DashboardHeader from './components/DashboardHeader.vue'
import MetricsOverview from './components/MetricsOverview.vue'
import StatusChart from './components/StatusChart.vue'
import RegionalChart from './components/RegionalChart.vue'
import OperationsTable from './components/OperationsTable.vue'
import ExceptionsTable from './components/ExceptionsTable.vue'
import DetailModal from './components/DetailModal.vue'

const {
  dashboardData,
  isLoading,
  lastRefresh,
  autoRefresh,
  filteredOperations,
  filteredExceptions,
  refreshData,
  exportToCSV,
  startAutoRefresh,
  stopAutoRefresh
} = useDashboard()

const detailDialog = ref(false)
const selectedItem = ref<Operation | Exception | null>(null)
const selectedType = ref<'operation' | 'exception'>('operation')

const metricDialog = ref(false)
const selectedMetric = ref<Metric | null>(null)

const handleMetricClick = (metric: Metric) => {
  selectedMetric.value = metric
  metricDialog.value = true
}

const showOperationDetails = (operation: Operation) => {
  selectedItem.value = operation
  selectedType.value = 'operation'
  detailDialog.value = true
}

const showExceptionDetails = (exception: Exception) => {
  selectedItem.value = exception
  selectedType.value = 'exception'
  detailDialog.value = true
}

const exportOperations = () => {
  exportToCSV(filteredOperations.value, 'operations')
}

const exportExceptions = () => {
  exportToCSV(filteredExceptions.value, 'exceptions')
}

onMounted(() => {
  startAutoRefresh()
})

onUnmounted(() => {
  stopAutoRefresh()
})
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}
</style>
