/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                f1: {
                    red: '#FF1801',
                    dark: '#15151E',
                    light: '#F3F3F3',
                    'carbon': '#1F1F26',
                }
            },
            fontFamily: {
                sans: ['"Michroma"', 'sans-serif'],
                display: ['"Michroma"', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'carbon-fiber': "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzjwq1ev/s8I44M48IE4AAz/Gf4Z5X+qAAAAAElFTkSuQmCC')",
            }
        },
    },
    plugins: [],
}
