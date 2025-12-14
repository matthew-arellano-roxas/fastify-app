import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

// New imports for Prettier
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  {
    ignores: ['dist/', 'build/', 'node_modules/', 'generated/', '**/*.d.ts'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/*.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_', // ignores function arguments starting with _
          varsIgnorePattern: '^_|error$', // ignores variables starting with _ or ending with 'error'
          caughtErrorsIgnorePattern: '^_|error$', // ignores catch errors named _ or error
        },
      ],
    },
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },

  ...tseslint.configs.recommended,

  prettierConfig,
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
]);
