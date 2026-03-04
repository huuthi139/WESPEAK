import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6C63FF",
          hover: "#5A52E0",
          light: "#8B85FF",
        },
        secondary: {
          DEFAULT: "#00D4AA",
          hover: "#00B894",
        },
        dark: {
          DEFAULT: "#0A0E1A",
          card: "#0F1428",
          elevated: "#19203C",
          surface: "#111827",
        },
        accent: {
          streak: "#FF6B6B",
          xp: "#A78BFA",
          gems: "#34D399",
          gold: "#FBBF24",
        },
        status: {
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#94A3B8",
          muted: "#64748B",
        },
        navy: {
          800: "#0D1542",
          900: "#070B24",
          950: "#040714",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["24px", { lineHeight: "32px", fontWeight: "700" }],
        h2: ["20px", { lineHeight: "28px", fontWeight: "600" }],
        h3: ["16px", { lineHeight: "24px", fontWeight: "600" }],
        body: ["14px", { lineHeight: "20px", fontWeight: "400" }],
        small: ["12px", { lineHeight: "16px", fontWeight: "400" }],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        "2xl": "32px",
      },
      spacing: {
        "1": "4px",
        "2": "8px",
        "3": "12px",
        "4": "16px",
        "5": "20px",
        "6": "24px",
        "8": "32px",
        "10": "40px",
        "12": "48px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        "glass-sm": "0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        "3d": "0 4px 14px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
        "3d-lg": "0 8px 28px rgba(0, 0, 0, 0.35), 0 2px 6px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
        "3d-float": "0 12px 40px rgba(0, 0, 0, 0.4), 0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        glow: "0 0 20px rgba(108, 99, 255, 0.3), 0 4px 14px rgba(0, 0, 0, 0.3)",
        "glow-lg": "0 0 30px rgba(108, 99, 255, 0.4), 0 0 60px rgba(108, 99, 255, 0.15), 0 8px 24px rgba(0, 0, 0, 0.3)",
        "glow-green": "0 0 20px rgba(0, 212, 170, 0.3), 0 4px 14px rgba(0, 0, 0, 0.3)",
        "glow-green-lg": "0 0 30px rgba(0, 212, 170, 0.4), 0 0 60px rgba(0, 212, 170, 0.15), 0 8px 24px rgba(0, 0, 0, 0.3)",
      },
      backgroundImage: {
        "navy-gradient": "linear-gradient(180deg, #0A0E1A 0%, #0D1542 50%, #070B24 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(15, 20, 40, 0.8) 0%, rgba(10, 14, 30, 0.6) 100%)",
        "primary-gradient": "linear-gradient(135deg, #6C63FF 0%, #8B85FF 100%)",
        "secondary-gradient": "linear-gradient(135deg, #00D4AA 0%, #00E5B8 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
