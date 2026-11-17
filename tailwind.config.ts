import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/redesign/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        scrollbar: '#b8c1ec',
        scrollbarHover: '#8590c3',
        scrollbarThumb: '#515ea3',
        // Redesign tokens (defined in src/redesign/styles/globals.css, adapt to light/dark automatically)
        paper: 'var(--paper)',
        'paper-2': 'var(--paper-2)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        rule: 'var(--rule)',
        accent: 'var(--accent)',
        brand: 'var(--brand)',
        'on-brand': 'var(--on-brand)',
        deep: 'var(--deep)',
        'on-deep': 'var(--on-deep)',
        ok: 'var(--ok)',
      },
      fontFamily: {
        dev: ['var(--font-sans)', 'system-ui', '"Hiragino Sans"', '"Yu Gothic UI"', 'Meiryo', 'sans-serif'],
        code: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
export default config;
