import eslintJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  eslintJs.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        console: true,
        localStorage: true,
        document: true,
        window: true,
        fetch: true,
        crypto: true,
        Request: true,
        Response: true,
        setInterval: true,
        Element: true,
        HTMLElement: true,
        HTMLTableSectionElement: true,
        Blob: true,
        URL: true
      }
    },
    plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-vars': 'off',
      'no-console': 'off',
      'no-debugger': 'error',
      'prefer-const': 'error'
    }
  }
];