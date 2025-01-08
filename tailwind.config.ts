import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const safelistLiteral: string[] = [];
const genClass = (
  prefix: string[],
  colors: string[],
  weights: number[],
  dark?: boolean,
) => {
  weights.forEach((weight) => {
    colors.forEach((color) => {
      prefix.forEach((pref) => {
        safelistLiteral.push(`${pref}-${color}-${weight}`);
        if (dark) safelistLiteral.push(`dark:${pref}-${color}-${weight}`);
      });
    });
  });
};

// wordType
const wordTypeColors = [
  "green",
  "blue",
  "orange",
  "cyan",
  "pink",
  "gray",
  "purple",
];
const wordTypeWeights = [400];
genClass(["text", "bg"], wordTypeColors, wordTypeWeights);

const learnFeatureColors = ["violet", "indigo", "emerald", "yellow", "red"];
const learnFeatureWeights = [50, 100, 300, 600, 900, 950];
genClass(["text", "bg"], learnFeatureColors, learnFeatureWeights, true);

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: safelistLiteral,
  theme: {
    extend: {
      gridTemplateColumns: {
        "16": "repeat(16, minmax(0, 1fr))",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
        "gradient-move": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        circling: {
          "0%": {
            transform: "rotate(0deg) translate(0, -3px) rotate(0deg)",
          },
          "12.5%": {
            transform: "rotate(45deg) translate(0, -3px) rotate(-45deg)",
          },
          "25%": {
            transform: "rotate(90deg) translate(0, -3px) rotate(-90deg)",
          },
          "37.5%": {
            transform: "rotate(135deg) translate(0, -3px) rotate(-135deg)",
          },
          "50%": {
            transform: "rotate(180deg) translate(0, -3px) rotate(-180deg)",
          },
          "62.5%": {
            transform: "rotate(225deg) translate(0, -3px) rotate(-225deg)",
          },
          "75%": {
            transform: "rotate(270deg) translate(0, -3px) rotate(-270deg)",
          },
          "87.5%": {
            transform: "rotate(315deg) translate(0, -3px) rotate(-315deg)",
          },
          "100%": {
            transform: "rotate(360deg) translate(0, -3px) rotate(-360deg)",
          },
        },
      },
      animation: {
        wiggle: "wiggle 2s ease-in-out infinite",
        "gradient-text": "gradient-move 3s infinite linear",
        circling: "circling 1s infinite linear",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
