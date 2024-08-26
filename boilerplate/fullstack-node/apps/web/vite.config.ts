import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import packageInfo from './package.json'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': resolve(import.meta.dirname, 'src')
		}
	},
	define: {
		'import.meta.env.VITE_APP_VERSION': JSON.stringify(packageInfo.version)
	},
	css: {
		postcss: {
			plugins: [tailwindcss, autoprefixer]
		}
	}
})
