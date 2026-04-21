import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#003466', // Colorado navy blue
          secondary: '#FFC627', // Colorado gold
          accent: '#367C2B', // Colorado green
          error: '#D64545',
          info: '#0071BC',
          success: '#4CAF50',
          warning: '#FFC627',
          background: '#F5F5F5',
          surface: '#FFFFFF',
        },
      },
    },
  },
  defaults: {
    VCard: {
      elevation: 1,
      rounded: 'md',
    },
    VBtn: {
      color: 'primary',
      variant: 'flat',
      rounded: 'md',
    },
    VChip: {
      rounded: 'md',
    },
  },
})
