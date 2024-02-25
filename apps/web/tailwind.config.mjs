/** @type {import('tailwindcss').Config} */

export default {
	mode: 'jit',
	content: [
		'./src/**/*.{astro,html}'
	],
	theme: {
		container: {
      center: true,
    },
		theme: {
			screens: {
				'sm': '40rem',
				'md': '48rem',
				'lg': '64rem',
				'xl': '80rem',
				'2xl': '96rem',
			}
		},
		extend: {
			'inter': ['Inter Variable', 'sans-serif']
		},
	},
	plugins: [],
}