/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [],
    safelist: [
        'text-green-500',
        'text-blue-500',
        'text-orange-500',
        'text-white',
    ],
};
