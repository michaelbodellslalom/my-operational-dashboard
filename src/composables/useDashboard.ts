import { ref, computed } from 'vue'
import type { DashboardData, DashboardFilters, Operation, Exception } from '../types/dashboard'
import { mockDashboardData } from '../data/mockData'
import { isWithinInterval, startOfDay, endOfDay, subDays } from 'date-fns'

const REFRESH_INTERVAL = 30000 // 30 seconds

export function useDashboard() {
  const dashboardData = ref<DashboardData>(mockDashboardData)
  const isLoading = ref(false)
  const lastRefresh = ref(new Date())
  const autoRefresh = ref(true)
  
  const filters = ref<DashboardFilters>({
    dateRange: {
      start: startOfDay(subDays(new Date(), 90)),
      end: endOfDay(new Date())
    },
    status: [],
    regions: [],
    priority: [],
    searchQuery: ''
  })

  // Filtered operations
  const filteredOperations = computed(() => {
    let ops = dashboardData.value.operations

    // Date range filter
    if (filters.value.dateRange.start && filters.value.dateRange.end) {
      ops = ops.filter(op => 
        isWithinInterval(op.createdAt, {
          start: filters.value.dateRange.start,
          end: filters.value.dateRange.end
        })
      )
    }

    // Status filter
    if (filters.value.status.length > 0) {
      ops = ops.filter(op => filters.value.status.includes(op.status))
    }

    // Region filter
    if (filters.value.regions.length > 0) {
      ops = ops.filter(op => filters.value.regions.includes(op.region))
    }

    // Priority filter
    if (filters.value.priority.length > 0) {
      ops = ops.filter(op => filters.value.priority.includes(op.priority))
    }

    // Search query
    if (filters.value.searchQuery) {
      const query = filters.value.searchQuery.toLowerCase()
      ops = ops.filter(op => 
        op.caseId.toLowerCase().includes(query) ||
        op.clientName.toLowerCase().includes(query) ||
        op.assignedTo.toLowerCase().includes(query)
      )
    }

    return ops
  })

  // Filtered exceptions
  const filteredExceptions = computed(() => {
    let exs = dashboardData.value.exceptions

    // Date range filter
    if (filters.value.dateRange.start && filters.value.dateRange.end) {
      exs = exs.filter(ex => 
        isWithinInterval(ex.createdAt, {
          start: filters.value.dateRange.start,
          end: filters.value.dateRange.end
        })
      )
    }

    // Region filter
    if (filters.value.regions.length > 0) {
      exs = exs.filter(ex => filters.value.regions.includes(ex.region))
    }

    // Search query
    if (filters.value.searchQuery) {
      const query = filters.value.searchQuery.toLowerCase()
      exs = exs.filter(ex => 
        ex.caseId.toLowerCase().includes(query) ||
        ex.message.toLowerCase().includes(query) ||
        (ex.assignedTo && ex.assignedTo.toLowerCase().includes(query))
      )
    }

    return exs
  })

  // Refresh dashboard data
  const refreshData = async () => {
    isLoading.value = true
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // In a real app, this would fetch from an API
      dashboardData.value = {
        ...mockDashboardData,
        lastUpdated: new Date()
      }
      
      lastRefresh.value = new Date()
    } finally {
      isLoading.value = false
    }
  }

  // Export data to CSV
  const exportToCSV = (data: Operation[] | Exception[], filename: string) => {
    if (data.length === 0) return

    const headers = Object.keys(data[0]).join(',')
    const rows = data.map(item => {
      return Object.values(item).map(value => {
        if (value instanceof Date) {
          return value.toISOString()
        }
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`
        }
        return value
      }).join(',')
    })

    const csv = [headers, ...rows].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
    window.URL.revokeObjectURL(url)
  }

  // Update filters
  const updateFilters = (newFilters: Partial<DashboardFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  // Clear all filters
  const clearFilters = () => {
    filters.value = {
      dateRange: {
        start: startOfDay(new Date()),
        end: endOfDay(new Date())
      },
      status: [],
      regions: [],
      priority: [],
      searchQuery: ''
    }
  }

  // Auto-refresh setup
  let refreshTimer: number | null = null

  const startAutoRefresh = () => {
    if (refreshTimer) return
    autoRefresh.value = true
    refreshTimer = window.setInterval(refreshData, REFRESH_INTERVAL)
  }

  const stopAutoRefresh = () => {
    if (refreshTimer) {
      clearInterval(refreshTimer)
      refreshTimer = null
    }
    autoRefresh.value = false
  }

  return {
    dashboardData,
    isLoading,
    lastRefresh,
    autoRefresh,
    filters,
    filteredOperations,
    filteredExceptions,
    refreshData,
    exportToCSV,
    updateFilters,
    clearFilters,
    startAutoRefresh,
    stopAutoRefresh
  }
}
