/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			customClasses: {
				'btn': 'scale-[0.9]'
			}
		},
	},
	plugins: [],
}
