# AI Assistant Instructions

## Context
This is a case management dashboard for public and social impact organizations. When working on this project, prioritize:

1. **Domain Accuracy**: Use terminology appropriate for social services (cases, clients, case workers, programs, outcomes)
2. **Privacy Sensitivity**: Client data is anonymized. Never suggest adding real personal information.
3. **Accessibility**: This tool serves case workers who may use it on mobile devices in the field.
4. **Grant Compliance**: Features should support grant reporting requirements (CSV export, outcome tracking).

## When Making Changes

### Adding New Features
- Follow Vue 3 Composition API patterns
- Add TypeScript types to `src/types/dashboard.ts` first
- Update mock data in `src/data/mockData.ts` to demonstrate the feature
- Ensure responsive design (works on mobile/tablet)

### Updating Data Models
- Case status values: open, active, completed, closed, on-hold
- Issue types: documentation, eligibility, service-access, compliance
- Always maintain TypeScript type safety

### UI/UX Considerations
- Use Vuetify components for consistency
- Follow Material Design color conventions
- Severity-based color coding (critical=red, high=orange, medium=blue, low=grey)
- Ensure all tables are sortable and exportable

### Testing Changes
- Run `npm run build` before committing to catch TypeScript errors
- Test filters and search functionality
- Verify charts update correctly
- Check responsive behavior

## Project Terminology Map
- "Operation" = Case (in code)
- "Exception" = Issue (in UI)
- "Customer" → "Client"
- "Order ID" → "Case ID"
- "Assigned To" → "Case Worker" or "Assigned To"
- "Revenue" → "Grant Disbursed"

## Common Tasks

### Adding a New Metric
1. Add to `metrics` array in `mockData.ts`
2. Use appropriate icon from Material Design Icons
3. Set trend direction (positive/negative/neutral)

### Adding a New Issue Type
1. Update `Exception` interface in `dashboard.ts`
2. Add to mock data with appropriate examples
3. Update type icon mapping in `ExceptionsTable.vue`

### Adding a New Region
1. Update `regionalData` array in `mockData.ts`
2. Update filter options in `FilterControls.vue`
3. Ensure chart displays correctly
