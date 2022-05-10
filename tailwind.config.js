module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#0FCFEC',
          secondary: '#19D3AE',
          accent: '#1bd5f1',
          neutral: '#3A4256',
          'base-100': '#ffffff',
          'base-200': '#ECEEF2',
          'base-300': '#D4D9E3',
        },
      },
    ],
  },
};
