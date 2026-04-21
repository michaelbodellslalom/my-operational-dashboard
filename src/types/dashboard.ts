export interface Metric {
  id: string
  title: string
  value: number
  unit: string
  change: number
  changeType: 'increase' | 'decrease'
  trend: 'positive' | 'negative' | 'neutral'
  icon: string
  color: string
}

export interface Operation {
  id: string
  caseId: string
  clientName: string
  status: 'open' | 'active' | 'completed' | 'closed' | 'on-hold'
  priority: 'low' | 'medium' | 'high' | 'critical'
  region: string
  assignedTo: string
  program: string
  createdAt: Date
  updatedAt: Date
  targetCompletion: Date
  progress: number
  outcomeScore?: number
}

export interface Exception {
  id: string
  caseId: string
  type: 'documentation' | 'eligibility' | 'service-access' | 'compliance'
  severity: 'critical' | 'high' | 'medium' | 'low'
  message: string
  description: string
  region: string
  createdAt: Date
  resolvedAt?: Date
  status: 'open' | 'investigating' | 'resolved'
  assignedTo?: string
}

export interface RegionalData {
  region: string
  cases: number
  completed: number
  successfulOutcomes: number
  grantDisbursed: number
}

export interface StatusData {
  status: string
  count: number
  color: string
}

export interface DateRange {
  start: Date
  end: Date
}

export interface DashboardFilters {
  dateRange: DateRange
  status: string[]
  regions: string[]
  priority: string[]
  searchQuery: string
}

export interface DashboardData {
  metrics: Metric[]
  operations: Operation[]
  exceptions: Exception[]
  regionalData: RegionalData[]
  statusData: StatusData[]
  lastUpdated: Date
}
