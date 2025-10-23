/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Workshop steel and iron colors
        'workshop-steel': '#3a4d5c',
        'workshop-iron': '#2c3840',
        'workshop-pewter': '#596773',
        'workshop-concrete': '#6b7280',
        
        // Metallic bike parts
        'spoke-silver': '#c0c7d1',
        'hub-gold': '#d4af37',
        'brass-aged': '#b5a642',
        'aluminum': '#8a95a5',
        'chrome': '#e8eef2',
        
        // Workshop environment
        'workbench-wood': '#4a3f35',
        'tool-red': '#c53030',
        'grease-black': '#1a1f25',
        'shop-floor': '#2d3640',
        
        // Practical accents
        'precision-blue': '#2563eb',
        'caution-orange': '#f59e0b',
        'drive-side-gold': '#d97706',
      }
    },
  },
  plugins: [],
}