import globals from 'globals'
import baseConfig from './eslint.config.js'

export default [
	...baseConfig,
	{ files: ['**/*.{js,ts}'] },
	{ languageOptions: { globals: globals.node } }
]
