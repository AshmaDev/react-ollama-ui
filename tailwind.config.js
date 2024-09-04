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
              minWidth: "stretch",
              maxWidth: "0",
              padding: 0,
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
