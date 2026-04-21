# Case Management Dashboard

A modern, real-time case management dashboard for public and social impact organizations, built with Vue 3, TypeScript, and Vuetify.

## Features

- 📊 **Real-time Metrics** - Track active cases, successful outcomes, issues, and resolution times
- 🔍 **Advanced Filtering** - Filter by case status, region, priority, and search
- 📈 **Interactive Charts** - Regional performance and case status distribution visualizations
- 📋 **Data Tables** - Case management and issue tracking with sortable columns
- 💾 **CSV Export** - Export filtered data for grant reporting and analysis
- 🔄 **Auto-refresh** - Automatic data updates every 30 seconds
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎯 **Drill-down Details** - Click any case or issue for detailed information
- 🚨 **Issue Tracking** - Color-coded severity levels for case issues (documentation, eligibility, service access, compliance)

## Tech Stack

- **Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Library**: Vuetify 3
- **Charts**: Chart.js with vue-chartjs
- **Icons**: Material Design Icons
- **Date Handling**: date-fns

## Project Structure

```
my-operational-dashboard/
├── src/
│   ├── components/           # Vue components
│   │   ├── DashboardHeader.vue
│   │   ├── MetricCard.vue
│   │   ├── MetricsOverview.vue
│   │   ├── StatusChart.vue
│   │   ├── RegionalChart.vue
│   │   ├── OperationsTable.vue    # Case management table
│   │   ├── ExceptionsTable.vue    # Issue tracking table
│   │   ├── FilterControls.vue
│   │   └── DetailModal.vue
│   ├── composables/          # Reusable composition functions
│   │   └── useDashboard.ts
│   ├── data/                 # Mock data (case management data)
│   │   └── mockData.ts
│   ├── types/                # TypeScript type definitions
│   │   └── dashboard.ts
│   ├── plugins/              # Vue plugins
│   │   └── vuetify.ts
│   ├── App.vue               # Root component
│   └── main.ts               # Application entry point
├── BRIEF.md                  # Project brief
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## Usage

### Filtering Data

Use the filtcase ID, client name, or case worker
- Filter by status (open, active, completed, closed, on hold)
- Filter by region (Northeast, Southeast, Midwest, West, Southwest)
- Filter by priority (low, medium, high, critical)

### Exporting Data

Click the "Export CSV" button on any table to download filtered data as a CSV file for grant reporting or further analysis.

### Viewing Details

Click on any row in the case management table or issue list to view detailed information in a modal dialog, including:
- Complete case details (client, program, case worker, outcome score)
- Case progress and timeline
- Issue details (type, severity, resolution status)

### Auto-refresh

The dashboard automatically refreshes data every 30 seconds. You can manually refresh by clicking the refresh button in the header.

## Data Model

The dashboard tracks:
- **Cases**: Client cases with status, priority, assigned case worker, program, and outcome metrics
- **Issues**: Case-related issues (documentation, eligibility, service access, compliance)
- **Regional Data**: Performance metrics by geographic region
- **Metrics**: Key performance indicators (caseload, outcome rates, resolution times)
The dashboard automatically refreshes data every 30 seconds. You can manually refresh by clicking the refresh button in the header.

## Customization

### Connecting to Real API

Replace the mock data in `src/composables/useDashboard.ts`:

```typescript
const refreshData = async () => {
  isLoading.value = true
  try {
    // Replace with your API call
    const response = await fetch('https://your-api.com/dashboard')
    const data = await response.json()
    
    dashboardData.value = {
      ...data,
      lastUpdated: new Date()
    }
    
    lastRefresh.value = new Date()
  } finally {
    isLoading.value = false
  }
}
```

### Customizing Theme

Edit `src/plugins/vuetify.ts` to customize colors and theme:

```typescript
theme: {
  themes: {
    light: {
      colors: {
        primary: '#1976D2',  // Customize colors here
        secondary: '#424242',
        // ... more colors
      },
    },
  },
}
```

## License

MIT License - see LICENSE file for details

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
