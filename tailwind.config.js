module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		container: {
			screens: {
				sm: '100%',
				md: '100%',
				lg: '1200px',
				xl: '1600px',
			},
			center: true
		},
		extend: {
			colors: {
				primary: '#3b3b3b',
				accent: '#FF5B14',
				info: '#2DA7FB',
				warning: '#FFCB11',
				danger: '#ec4141',
				success: '#67db8e',

				'light-gray': '#F5F5F5',
				'light-pink': '#FFE2EE',

				'gray-accent': '#60606020',

				'gray': '#60606010',
				'semidark-gray': '#6060601f',

				'mediumlight-pink': '#F4D5E2',
				'semilight-pink': '#F598B6',
				'pink': '#FF5897',

				'violet': '#D0AAF4',

				'dark-violet': '#AAA5D1',

				'light-green': '#BCF2C9',

				'pastel-blue': '#7DA0B6',
				'sky-blue': '#93D6F2',

				'light-yellow': '#F7F78E',
				'medium-gray' : '#60606080'
			},
			fontFamily: {
				main: 'Aktiv Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
				secondary: 'TJ Evolette A Basic, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
			},
			scale: {
				'20': '.20',
				'30': '.30',
				'80': '.80',
				'85': '.85',
			},
			fontSize: {
				'tiny': '.6rem',
				'1.5xl': '22px',
				'2.5xl': '1.75rem',
				'4.5xl': ['2.5rem', 1.25],
				'5.25xl': ['3.125rem', 1],
				'5.5xl': ['3.625rem', 1],
				'7.5xl': ['5.625rem', 1.125]
			},
			maxWidth: {
				'sm/lg': '29rem',
				'vxs': '16rem'
			},
			maxHeight: {
				'sm/lg': '29rem',
				'vxs': '16rem'
			},
			height: {
				'100': '25rem',
				'26rem': '26rem',
				'120': '30rem',
				'130': '32.5rem',
				'144': '36rem',
				'155': '38.75rem',
				'160': '40rem',
				'200': '50rem',
				'75': '18.75rem',
				'192': '48rem'
			},
			width: {
				'100': '25rem',
				'130': '32.5rem',
				'144': '36rem',
				'160': '40rem',
				'192': '48rem'
			},
			screens: {
				'-3xl': { raw: '(max-width: 1600px)' },
				'-2xl': { raw: '(max-width: 1600px)' },
				'-xl': { raw: '(max-width: 1279px)' },
				'-lg': { raw: '(max-width: 1023px)' },
				'-md': { raw: '(max-width: 767px)' },
				'-sm': { raw: '(max-width: 639px)' },
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
