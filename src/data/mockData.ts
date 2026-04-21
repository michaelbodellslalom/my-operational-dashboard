import type { DashboardData, Metric, Operation, Exception, RegionalData, StatusData } from '../types/dashboard'
import { subDays, subHours, addDays } from 'date-fns'

export const metrics: Metric[] = [
  {
    id: 'm1',
    title: 'Total Active Cases',
    value: 487,
    unit: '',
    change: 8.3,
    changeType: 'increase',
    trend: 'neutral',
    icon: 'mdi-folder-account',
    color: 'blue'
  },
  {
    id: 'm2',
    title: 'Successful Outcomes',
    value: 82.7,
    unit: '%',
    change: 4.2,
    changeType: 'increase',
    trend: 'positive',
    icon: 'mdi-check-circle',
    color: 'green'
  },
  {
    id: 'm3',
    title: 'Active Issues',
    value: 18,
    unit: '',
    change: 12.5,
    changeType: 'decrease',
    trend: 'positive',
    icon: 'mdi-alert-circle',
    color: 'orange'
  },
  {
    id: 'm4',
    title: 'Avg Resolution Time (days)',
    value: 12.3,
    unit: '',
    change: 6.8,
    changeType: 'decrease',
    trend: 'positive',
    icon: 'mdi-clock-fast',
    color: 'purple'
  }
]

export const operations: Operation[] = [
  {
    id: 'op1',
    caseId: 'CASE-2026-1001',
    clientName: 'Client A (Housing)',
    status: 'active',
    priority: 'high',
    region: 'Northeast',
    assignedTo: 'Maria Garcia',
    program: 'Housing Assistance',
    createdAt: subDays(new Date(), 15),
    updatedAt: subHours(new Date(), 2),
    targetCompletion: addDays(new Date(), 5),
    progress: 65,
    outcomeScore: 75
  },
  {
    id: 'op2',
    caseId: 'CASE-2026-1002',
    clientName: 'Client B (Healthcare)',
    status: 'completed',
    priority: 'medium',
    region: 'Southeast',
    assignedTo: 'James Chen',
    program: 'Healthcare Access',
    createdAt: subDays(new Date(), 30),
    updatedAt: subDays(new Date(), 1),
    targetCompletion: subDays(new Date(), 1),
    progress: 100,
    outcomeScore: 92
  },
  {
    id: 'op3',
    caseId: 'CASE-2026-1003',
    clientName: 'Client C (Employment)',
    status: 'closed',
    priority: 'critical',
    region: 'Midwest',
    assignedTo: 'Sarah Thompson',
    program: 'Job Training',
    createdAt: subDays(new Date(), 45),
    updatedAt: subDays(new Date(), 3),
    targetCompletion: subDays(new Date(), 3),
    progress: 100,
    outcomeScore: 45
  },
  {
    id: 'op4',
    caseId: 'CASE-2026-1004',
    clientName: 'Client D (Family Services)',
    status: 'open',
    priority: 'low',
    region: 'West',
    assignedTo: 'David Patel',
    program: 'Family Support',
    createdAt: subDays(new Date(), 2),
    updatedAt: subDays(new Date(), 1),
    targetCompletion: addDays(new Date(), 20),
    progress: 10
  },
  {
    id: 'op5',
    caseId: 'CASE-2026-1005',
    clientName: 'Client E (Mental Health)',
    status: 'active',
    priority: 'high',
    region: 'Northeast',
    assignedTo: 'Lisa Anderson',
    program: 'Mental Health Services',
    createdAt: subDays(new Date(), 20),
    updatedAt: subHours(new Date(), 4),
    targetCompletion: addDays(new Date(), 10),
    progress: 75,
    outcomeScore: 68
  },
  {
    id: 'op6',
    caseId: 'CASE-2026-1006',
    clientName: 'Client F (Housing)',
    status: 'completed',
    priority: 'medium',
    region: 'Southeast',
    assignedTo: 'Maria Garcia',
    program: 'Housing Assistance',
    createdAt: subDays(new Date(), 60),
    updatedAt: subDays(new Date(), 5),
    targetCompletion: subDays(new Date(), 5),
    progress: 100,
    outcomeScore: 88
  },
  {
    id: 'op7',
    caseId: 'CASE-2026-1007',
    clientName: 'Client G (Education)',
    status: 'active',
    priority: 'medium',
    region: 'Southwest',
    assignedTo: 'James Chen',
    program: 'Education Support',
    createdAt: subDays(new Date(), 10),
    updatedAt: subHours(new Date(), 6),
    targetCompletion: addDays(new Date(), 15),
    progress: 50,
    outcomeScore: 70
  },
  {
    id: 'op8',
    caseId: 'CASE-2026-1008',
    clientName: 'Client H (Emergency Aid)',
    status: 'on-hold',
    priority: 'low',
    region: 'Northeast',
    assignedTo: 'Sarah Thompson',
    program: 'Emergency Assistance',
    createdAt: subDays(new Date(), 8),
    updatedAt: subDays(new Date(), 2),
    targetCompletion: addDays(new Date(), 12),
    progress: 20
  }
]

export const exceptions: Exception[] = [
  {
    id: 'ex1',
    caseId: 'CASE-2026-1003',
    type: 'eligibility',
    severity: 'critical',
    message: 'Income verification missing',
    description: 'Client has not submitted required income documentation. Grant disbursement on hold pending verification.',
    region: 'Midwest',
    createdAt: subHours(new Date(), 2),
    status: 'investigating',
    assignedTo: 'Sarah Thompson'
  },
  {
    id: 'ex2',
    caseId: 'CASE-2026-0995',
    type: 'service-access',
    severity: 'high',
    message: 'Service provider unavailable',
    description: 'Primary mental health provider no longer accepting new clients. Need to identify alternative provider in network.',
    region: 'Northeast',
    createdAt: subHours(new Date(), 5),
    status: 'open',
    assignedTo: 'Lisa Anderson'
  },
  {
    id: 'ex3',
    caseId: 'CASE-2026-0987',
    type: 'compliance',
    severity: 'medium',
    message: 'Grant reporting deadline approaching',
    description: 'Quarterly outcome metrics due to funder in 5 days. Case documentation needs completion.',
    region: 'Southeast',
    createdAt: subHours(new Date(), 12),
    status: 'resolved',
    assignedTo: 'James Chen',
    resolvedAt: subHours(new Date(), 1)
  },
  {
    id: 'ex4',
    caseId: 'CASE-2026-1001',
    type: 'documentation',
    severity: 'low',
    message: 'Progress notes incomplete',
    description: 'Last two case management sessions missing progress notes. Required for audit compliance.',
    region: 'Northeast',
    createdAt: subHours(new Date(), 3),
    status: 'investigating',
    assignedTo: 'Maria Garcia'
  },
  {
    id: 'ex5',
    caseId: 'CASE-2026-0991',
    type: 'eligibility',
    severity: 'high',
    message: 'Re-certification overdue',
    description: 'Client eligibility re-certification was due 10 days ago. Services may need to be suspended pending re-certification.',
    region: 'West',
    createdAt: subHours(new Date(), 8),
    status: 'open',
    assignedTo: 'David Patel'
  }
]

export const regionalData: RegionalData[] = [
  {
    region: 'Northeast',
    cases: 142,
    completed: 118,
    successfulOutcomes: 98,
    grantDisbursed: 485000
  },
  {
    region: 'Southeast',
    cases: 128,
    completed: 112,
    successfulOutcomes: 94,
    grantDisbursed: 412000
  },
  {
    region: 'Midwest',
    cases: 98,
    completed: 82,
    successfulOutcomes: 65,
    grantDisbursed: 298000
  },
  {
    region: 'West',
    cases: 87,
    completed: 74,
    successfulOutcomes: 62,
    grantDisbursed: 356000
  },
  {
    region: 'Southwest',
    cases: 32,
    completed: 26,
    successfulOutcomes: 22,
    grantDisbursed: 145000
  }
]

export const statusData: StatusData[] = [
  { status: 'Completed', count: 412, color: '#4CAF50' },
  { status: 'Active', count: 156, color: '#2196F3' },
  { status: 'Open', count: 89, color: '#FFC107' },
  { status: 'Closed', count: 38, color: '#9E9E9E' },
  { status: 'On Hold', count: 12, color: '#FF9800' }
]

export const mockDashboardData: DashboardData = {
  metrics,
  operations,
  exceptions,
  regionalData,
  statusData,
  lastUpdated: new Date()
}
