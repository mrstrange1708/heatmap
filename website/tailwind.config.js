/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "../packages/heat/src/**/*.{js,ts,jsx,tsx}" // Include package source for Tailwind class scanning
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
