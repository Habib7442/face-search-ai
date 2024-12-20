import type { Config } from "tailwindcss";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        // Light mode colors
        light: {
          background: "#ffffff",
          "background-secondary": "#f8fafc",
          foreground: "#0f172a",
          primary: {
            DEFAULT: "#3b82f6",
            hover: "#2563eb",
            foreground: "#ffffff",
          },
          secondary: {
            DEFAULT: "#f1f5f9",
            hover: "#e2e8f0",
            foreground: "#1e293b",
          },
          muted: {
            DEFAULT: "#f1f5f9",
            foreground: "#64748b",
          },
          accent: {
            DEFAULT: "#8b5cf6",
            hover: "#7c3aed",
            foreground: "#ffffff",
          },
          destructive: {
            DEFAULT: "#ef4444",
            hover: "#dc2626",
            foreground: "#ffffff",
          },
          border: "#e2e8f0",
          input: "#e2e8f0",
          ring: "#3b82f6",
        },
        // Dark mode colors
        dark: {
          background: "#0f172a",
          "background-secondary": "#1e293b",
          foreground: "#f8fafc",
          primary: {
            DEFAULT: "#3b82f6",
            hover: "#60a5fa",
            foreground: "#ffffff",
          },
          secondary: {
            DEFAULT: "#1e293b",
            hover: "#334155",
            foreground: "#f8fafc",
          },
          muted: {
            DEFAULT: "#1e293b",
            foreground: "#94a3b8",
          },
          accent: {
            DEFAULT: "#8b5cf6",
            hover: "#a78bfa",
            foreground: "#ffffff",
          },
          destructive: {
            DEFAULT: "#ef4444",
            hover: "#f87171",
            foreground: "#ffffff",
          },
          border: "#334155",
          input: "#334155",
          ring: "#3b82f6",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        blob: 'blob 7s infinite',
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    addVariablesForColors,
  ],
} satisfies Config;

function addVariablesForColors({ addBase, theme }: { 
  addBase: (config: Record<string, any>) => void;
  theme: (path: string) => Record<string, any>;
}) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
