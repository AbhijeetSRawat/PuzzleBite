import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "#6366f1", // Indigo 500
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "#14b8a6", // Teal 500
                    foreground: "#ffffff",
                },
                accent: {
                    DEFAULT: "#ec4899", // Pink 500
                    foreground: "#ffffff",
                },
                card: {
                    DEFAULT: "rgba(255, 255, 255, 0.05)",
                    foreground: "#ffffff",
                },
            },
            fontFamily: {
                sans: ["var(--font-outfit)", "sans-serif"],
            },
            animation: {
                "spin-slow": "spin 3s linear infinite",
                float: "float 6s ease-in-out infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
            },
        },
    },
    plugins: [],
} satisfies Config;
