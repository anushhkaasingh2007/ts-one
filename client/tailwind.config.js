/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "Noto Sans", "system-ui", "sans-serif"],
        hindi: ["Noto Sans", "Noto Sans Devanagari", "system-ui", "sans-serif"],
        display: ["Manrope", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        navy: {
          DEFAULT: "#0B3D91",
          50: "#EBF1FB",
          100: "#D2E0F5",
          200: "#A6C2EC",
          300: "#7AA3E2",
          400: "#4D85D9",
          500: "#2566C0",
          600: "#0B3D91",
          700: "#093275",
          800: "#072859",
          900: "#051D3E",
          950: "#03122A",
        },
        saffron: {
          DEFAULT: "#FF9933",
          50: "#FFF4E8",
          100: "#FFE4C2",
          200: "#FFCE8F",
          300: "#FFB85C",
          400: "#FFA229",
          500: "#FF9933",
          600: "#E67F0E",
          700: "#B4630B",
          800: "#824708",
          900: "#502B05",
        },
        green: {
          DEFAULT: "#138808",
          50: "#E9F7E7",
          100: "#C6ECC1",
          200: "#9DDF94",
          300: "#73D267",
          400: "#4AC53A",
          500: "#138808",
          600: "#107206",
          700: "#0C5A05",
          800: "#094203",
          900: "#052A02",
        },
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
      },
      borderRadius: {
        gov: "12px",
      },
      boxShadow: {
        gov: "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        "gov-lg": "0 4px 12px -2px rgb(0 0 0 / 0.10), 0 2px 6px -2px rgb(0 0 0 / 0.06)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(19,136,8,0.35)" },
          "100%": { boxShadow: "0 0 0 12px rgba(19,136,8,0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "pulse-ring": "pulse-ring 1.8s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [],
};
