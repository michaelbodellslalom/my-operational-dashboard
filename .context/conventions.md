# Code Conventions & Patterns

## Component Naming
- PascalCase for component files: `DashboardHeader.vue`, `MetricCard.vue`
- Use descriptive, domain-specific names: `OperationsTable` for case management, `ExceptionsTable` for issues

## TypeScript Types
- All types defined in `src/types/dashboard.ts`
- Use interfaces for data structures
- Key interfaces:
  - `Operation` - Represents a case
  - `Exception` - Represents an issue
  - `Metric` - Dashboard KPI
  - `RegionalData` - Regional performance data
  - `DashboardFilters` - Filter state

## State Management
- Using Vue Composition API
- `useDashboard()` composable manages all dashboard state
- No external state management library (Pinia/Vuex) needed for this scope

## Data Flow
1. `useDashboard` composable provides data and methods
2. Components receive data via props
3. Events bubble up for user interactions
4. Computed properties handle filtering

## Styling
- Vuetify components for consistency
- Material Design color scheme
- Responsive breakpoints handled by Vuetify grid system

## Status Values
- **Case Status**: open, active, completed, closed, on-hold
- **Priority**: low, medium, high, critical
- **Issue Types**: documentation, eligibility, service-access, compliance
- **Issue Status**: open, investigating, resolved
- **Severity**: low, medium, high, critical

## Regions
- Northeast
- Southeast
- Midwest
- West
- Southwest

## Color Coding
- **Status Colors**:
  - open: warning (yellow)
  - active: info (blue)
  - completed: success (green)
  - closed: grey
  - on-hold: orange
- **Priority Colors**:
  - low: grey
  - medium: info (blue)
  - high: warning (orange)
  - critical: error (red)
