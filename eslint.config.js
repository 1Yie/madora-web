import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';
import perfectionist from 'eslint-plugin-perfectionist';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
	globalIgnores([
		'dist',
		'src/components/ui/**',
		'src/components/coss/**',
		'src/test/**',
	]),

	{
		files: ['**/*.{ts,tsx}'],
		plugins: {
			unicorn,
			perfectionist,
		},
		extends: [
			js.configs.recommended,
			...tseslint.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		rules: {
			'unicorn/filename-case': [
				'error',
				{
					case: 'kebabCase',
					ignore: ['App.tsx', 'Vite-env.d.ts'],
				},
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'perfectionist/sort-imports': ['warn', { type: 'natural', order: 'asc' }],
			'perfectionist/sort-jsx-props': [
				'warn',
				{ type: 'natural', order: 'asc' },
			],
		},
	},
]);
