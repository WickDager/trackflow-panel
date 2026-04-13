import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0E1117',
          surface: '#161B24',
          elevated: '#1E2533',
          border: '#2A3245',
        },
        accent: {
          DEFAULT: '#22C55E',
          dim: '#16A34A',
          muted: '#14532D',
          subtle: '#052512',
        },
        ink: {
          primary: '#F0F4FF',
          secondary: '#8B96B0',
          muted: '#4A5568',
        },
        status: {
          green: '#22C55E',
          'green-bg': '#052512',
          blue: '#3B82F6',
          'blue-bg': '#0F1E3A',
          amber: '#F59E0B',
          'amber-bg': '#2D2010',
          red: '#EF4444',
          'red-bg': '#2D1515',
        },
      },
    },
  },
  plugins: [],
};

export default config;
