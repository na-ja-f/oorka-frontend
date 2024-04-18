/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        myViolet: '#903de1',
        myBiege: '#ededed',
        myText: '#434343',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}