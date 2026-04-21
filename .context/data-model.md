# Data Model

## Case (Operation Interface)
Represents a client case in the system.

```typescript
interface Operation {
  id: string                    // Unique identifier
  caseId: string                // Display ID (e.g., "CASE-2026-1001")
  clientName: string            // Client identifier (anonymized, e.g., "Client A (Housing)")
  status: 'open' | 'active' | 'completed' | 'closed' | 'on-hold'
  priority: 'low' | 'medium' | 'high' | 'critical'
  region: string                // Geographic region
  assignedTo: string            // Case worker name
  program: string               // Program type (e.g., "Housing Assistance")
  createdAt: Date               // Case creation date
  updatedAt: Date               // Last update
  targetCompletion: Date        // Target completion date
  progress: number              // Progress percentage (0-100)
  outcomeScore?: number         // Outcome success score (0-100)
}
```

## Issue (Exception Interface)
Represents a case-related issue or problem.

```typescript
interface Exception {
  id: string                    // Unique identifier
  caseId: string                // Related case ID
  type: 'documentation' | 'eligibility' | 'service-access' | 'compliance'
  severity: 'critical' | 'high' | 'medium' | 'low'
  message: string               // Short issue description
  description: string           // Detailed issue description
  region: string                // Geographic region
  createdAt: Date               // When issue was identified
  resolvedAt?: Date             // When issue was resolved
  status: 'open' | 'investigating' | 'resolved'
  assignedTo?: string           // Assigned staff member
}
```

## Regional Performance
Aggregated metrics by geographic region.

```typescript
interface RegionalData {
  region: string                // Region name
  cases: number                 // Total cases in region
  completed: number             // Completed cases
  successfulOutcomes: number    // Cases with successful outcomes
  grantDisbursed: number        // Grant funds disbursed ($)
}
```

## Metrics
Key performance indicators displayed on dashboard.

```typescript
interface Metric {
  id: string
  title: string                 // Display title
  value: number                 // Current value
  unit: string                  // Unit of measurement
  change: number                // Percentage change
  changeType: 'increase' | 'decrease'
  trend: 'positive' | 'negative' | 'neutral'
  icon: string                  // Material Design Icon
  color: string                 // Display color
}
```

## Current Programs
- Housing Assistance
- Healthcare Access
- Job Training
- Mental Health Services
- Family Support
- Education Support
- Emergency Assistance
