/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    // "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "solar-blue-dark": "#154295",
        "solar-blue-light": "#29ABE2",
        "solar-yellow-dark": "#F18800",
        "solar-yellow-light": "#FFD100",
        "solar-gray-dark": "#F1F1F1",
        "solar-gray-middle": "#F8F8F8",
        "solar-gray-light": "#FAFAFA",
        "solar-orange-middle": "#F5B025",
        "solar-orange-dark": "#EC6608",
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
      backgroundImage: {
        'auth-image': "url('/images/chartnew.jpg')"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}