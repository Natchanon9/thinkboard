import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        thinkboard: {
          "primary": "#8b5cf6",
          "primary-focus": "#7c3aed",
          "primary-content": "#ffffff",

          "secondary": "#06b6d4",
          "secondary-focus": "#0891b2",
          "secondary-content": "#ffffff",

          "accent": "#f59e0b",
          "accent-focus": "#d97706",
          "accent-content": "#ffffff",

          "neutral": "#1e293b",
          "neutral-focus": "#0f172a",
          "neutral-content": "#e2e8f0",

          "base-100": "#0f172a",
          "base-200": "#1e293b",
          "base-300": "#334155",
          "base-content": "#f1f5f9",

          "info": "#3abff8",
          "success": "#10b981",
          "warning": "#fbbf24",
          "error": "#ef4444",

          "--rounded-box": "1.5rem",
          "--rounded-btn": "1rem",
          "--rounded-badge": "1rem",
        },
      },
    ],
  },
};
