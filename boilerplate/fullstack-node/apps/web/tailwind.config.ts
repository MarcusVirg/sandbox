import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
	darkMode: 'class',
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			colors: {
				brand: {
					blue: '#5A95D8'
				},
				gray: colors.zinc,
				slate: colors.slate
			}
		}
	},
	plugins: []
}

export default config
