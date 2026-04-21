# Technical Stack

## Frontend Framework
- **Vue 3** - Using Composition API for reactive, maintainable code
- **TypeScript** - For type safety and better developer experience
- **Vite** - Build tool and dev server

## UI & Styling
- **Vuetify 3** - Material Design component library
- **Material Design Icons** - Icon system
- **Chart.js** with vue-chartjs - Data visualization

## Utilities
- **date-fns** - Date manipulation and formatting

## Project Structure
```
src/
├── components/       # Vue components
│   ├── DashboardHeader.vue
│   ├── MetricCard.vue
│   ├── MetricsOverview.vue
│   ├── StatusChart.vue
│   ├── RegionalChart.vue
│   ├── OperationsTable.vue    # Case management table
│   ├── ExceptionsTable.vue    # Issue tracking table
│   ├── FilterControls.vue
│   └── DetailModal.vue
├── composables/      # Reusable composition functions
│   └── useDashboard.ts
├── data/            # Mock data (case management scenarios)
│   └── mockData.ts
├── types/           # TypeScript type definitions
│   └── dashboard.ts
├── plugins/         # Vue plugins
│   └── vuetify.ts
├── App.vue          # Root component
└── main.ts          # Application entry point
```

## Development Commands
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
```

## Deployment
- **GitHub**: https://github.com/michaelbodellslalom/my-operational-dashboard
- **Vercel**: Auto-deploys on push to main branch
