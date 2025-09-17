// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false, // disable Tailwind reset to avoid overriding Docusaurus styles
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}", "../docs/**/*.mdx"],
  darkMode: ["class", '[data-theme="dark"]'], // hooks into docusaurus' dark mode settings
  theme: {
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      transparent: "transparent",
      current: "currentColor",
      primary: {
        50: "#ECFDF5",
        100: "#D1FAE5",
        200: "#A7F3D0",
        300: "#6EE7B7",
        400: "#34D399",
        500: "#10B981",
        600: "#059669",
        700: "#047857",
        800: "#065F46",
        900: "#064E3B",
        default: "#10B981",
      },
      secondary: {
        50: "#FAFAF9",
        100: "#F5F5F4",
        200: "#E7E5E4",
        300: "#D6D3D1",
        400: "#A8A29E",
        500: "#78716C",
        600: "#57534E",
        700: "#44403C",
        800: "#292524",
        900: "#1C1917",
        default: "#78716C",
      },
      gray: {
        50: "#F9FAFB",
        100: "#F3F4F6",
        200: "#E5E7EB",
        300: "#D1D5DB",
        400: "#9CA3AF",
        500: "#6B7280",
        600: "#4B5563",
        700: "#374151",
        800: "#1F2937",
        900: "#111827",
      },
      success: "#10B981",
      warning: "#F59E0B",
      danger: "#EF4444",
      info: "#10B981",
      // Additional green complementary colors
      forest: "#064E3B",
      sage: "#84CC16",
      mint: "#6EE7B7",
      earth: "#78716C",
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'large': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
