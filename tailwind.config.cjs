/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: [
			{
				stringTheme: {
					primary: '#006AB7',

					secondary: '#F92572',

					neutral: '#003669',

					info: '#009BE1',

					success: '#15E883',

					warning: '#FFEB84',

					error: '#F92572',

          "hover-light": "#DFF1FF",

          "label-live": "#07AD5E",

          "label-test": "#F3B04B",
          
          "red-warning": "#F56161",
          
          "dark-grey": "#BEBCBA",

				}
			}
		]
	},
	plugins: [require('daisyui')]
};
