/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'gray-blue': {
					'10':  '#ECEEF1',
					'20':  '#D8DDE2',
					'40':  '#8A98A9',
					'60':  '#3C5370',
					'80':  '#243243',
					'100': '#0C1116',
				}
			},
		},
	},
	daisyui: {
		themes: [
			{
				stringTheme: {
					primary: '#006AB7',

					secondary: '#F92572',

					neutral: '#003669',

					info: '#009BE1',

					success: '#15E883',

					warning: '#F56161',

					error: '#F92572'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};
