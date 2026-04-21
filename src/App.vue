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

const handleMetricClick = (metric: Metric) => {
  console.log('Metric clicked:', metric)
  // Could open a detailed view or filter based on metric
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
