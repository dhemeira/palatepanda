const { withMaterialColors } = require('tailwind-material-colors');

/** @type {import('tailwindcss').Config} */
module.exports = withMaterialColors(
  {
    darkMode: 'class',
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
      extend: {
        height: {
          screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
        },
        minHeight: {
          screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
        },
        maxHeight: {
          screen: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
        },
        colors: {
          active: '#22c55e',
        },
      },
    },
    plugins: [],
  },
  {
    // Here, your base colors as HEX values
    // primary is required
    // secondary and/or tertiary are optional, if not set they will be derived from the primary color
    primary: '#5c6bc0',
    secondary: '#f9aa33',
  }
);
