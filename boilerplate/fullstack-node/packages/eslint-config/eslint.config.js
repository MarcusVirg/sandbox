import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginPrettier from 'eslint-plugin-prettier/recommended'

/**
 * @see https://eslint.org/docs/latest/rules
 * @type {import("eslint").Linter.Config}
 */
export default [
	pluginJs.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	pluginPrettier,
	{
		rules: {
			'prettier/prettier': 'warn',
			'@typescript-eslint/consistent-type-definitions': 'off'
		}
	},
	// Turning off for now since it errors every time I create a new file
	// {
	// 	languageOptions: {
	// 		parserOptions: {
	// 			projectService: true,
	// 			tsconfigRootDir: import.meta.dirname
	// 		}
	// 	}
	// },
	{ ignores: ['eslint-config', 'dist'] }
]
