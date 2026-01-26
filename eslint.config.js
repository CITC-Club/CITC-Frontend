import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import google from 'eslint-config-google';
import { defineConfig, globalIgnores } from 'eslint/config';

// Remove deprecated rules from Google config
const { 'valid-jsdoc': _, 'require-jsdoc': __, ...googleRules } = google.rules;

export default defineConfig([
  globalIgnores(['dist', 'build']),

  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: './tsconfig.eslint.json',
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': tsPlugin,
    },

    settings: {
      react: { version: 'detect' },
    },

    rules: {
      /* ---------------- GOOGLE STYLE ---------------- */
      ...googleRules,

      /* ---------------- REACT ---------------- */
      'react/react-in-jsx-scope': 'off',

      /* ---------------- HOOKS ---------------- */
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      /* ---------------- TYPESCRIPT ---------------- */
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      /* ---------------- SPACING (GOOGLE-COMPATIBLE) ---------------- */
      'indent': ['error', 2, { SwitchCase: 1 }],
      'max-len': ['error', { code: 450, ignoreUrls: true }],
      'quotes': ['error', 'single', { allowTemplateLiterals: true }],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
    },
  },
  {
    files: ['vite.config.*'],
    rules: {
      'max-len': 'off', // Disable max-len for Vite config
      'no-unused-vars': 'off',
      'new-cap': 'off', // Disable no-unused-vars for Vite config
    },
  },
]);
