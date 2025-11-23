/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- Esta línea es la clave, busca en TODO src
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Cinzel", "serif"], // Nuestra fuente medieval
      },
    },
  },
  plugins: [],
};
