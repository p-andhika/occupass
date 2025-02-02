import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', '.eslintrc.cjs'] }, // Merged ignore patterns
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'eslint-config-prettier', // Ensure this is last to override formatting rules
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest', // Updated to match the first snippet
      sourceType: 'module', // Added from the first snippet
      globals: {
        ...globals.browser,
        ...globals.es2020, // Added es2020 globals from the first snippet
      },
    },
    settings: {
      react: { version: '18.2' }, // Added React version setting
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: {}, // Added import plugin (placeholder for now)
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'import/newline-after-import': ['error', { count: 1 }], // Added rule from the first snippet
    },
  }
);
