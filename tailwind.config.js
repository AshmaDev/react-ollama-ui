/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{tsx,ts,jsx,js}"],
  theme: {
    extend: {
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            pre: {
              backgroundColor: "transparent",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
