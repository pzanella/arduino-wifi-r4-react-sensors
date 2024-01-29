/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                blue: "#1fb6ff",
            },
            width: {
                content: "fit-content",
            },
        },
    },
    plugins: [],
};
