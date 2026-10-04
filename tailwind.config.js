import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['"DM Sans"', ...defaultTheme.fontFamily.sans],
                display: ['"Merriweather"', 'Georgia', 'serif'],
            },
            colors: {
                galaxy: '#081F5C',
                planetary: '#334EAC',
                universe: '#7096D1',
                venus: '#BAD6EB',
                sky: '#D0E3FF',
                meteor: '#F7F2EB',
                'milky-way': '#FFF9F0',
            },
            borderRadius: {
                sm: '6px',
                DEFAULT: '10px',
                md: '12px',
                lg: '16px',
                xl: '24px',
            },
            maxWidth: {
                container: '1280px',
            },
        },
    },

    plugins: [forms],
};
