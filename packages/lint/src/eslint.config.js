import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'

import globals from 'globals'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import _import from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'
import tsParser from '@typescript-eslint/parser'
import jest from 'eslint-plugin-jest'
import cypress from 'eslint-plugin-cypress'
import json from 'eslint-plugin-json'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import { FlatCompat } from '@eslint/eslintrc'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  ...fixupConfigRules(
    compat.extends(
      'turbo',
      'airbnb/base',
      'airbnb/hooks',
      'plugin:eslint-comments/recommended',
      'plugin:import/recommended',
      'plugin:promise/recommended',
      'plugin:unicorn/recommended',
      'prettier',
    ),
  ),
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },

      ecmaVersion: 5,
      sourceType: 'module',
    },

    settings: {
      react: {
        version: '18.3',
      },
    },

    rules: {
      'unicorn/prefer-module': 'off',
      'no-irregular-whitespace': 'off',
      'no-restricted-syntax': 'off',
      'import/prefer-default-export': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/prefer-query-selector': 'off',
      'no-continue': 'off',
      'prettier/prettier': 'error',

      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      'unicorn/no-null': 'off',

      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },

          ignore: ['.json$'],
        },
      ],

      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            Props: true,
            props: true,
            args: true,
            Param: true,
            param: true,
            Params: true,
            params: true,
            Env: true,
            env: true,
            ref: true,
            Ref: true,
            refs: true,
            Refs: true,
            doc: true,
            Doc: true,
            docs: true,
            Docs: true,
            res: true,
            varDirectory: true,
            createVarDirectory: true,
          },
        },
      ],
    },
  },
  ...fixupConfigRules(
    compat.extends(
      'turbo',
      'airbnb',
      'airbnb-typescript',
      'airbnb/hooks',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:eslint-comments/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:promise/recommended',
      'plugin:unicorn/recommended',
      'prettier',
    ),
  ).map((config) => ({
    ...config,
    files: ['**/*.+(ts|tsx)'],
  })),
  {
    files: ['**/*.+(ts|tsx)'],

    plugins: {
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      import: fixupPluginRules(_import),
      prettier,
      unicorn: fixupPluginRules(eslintPluginUnicorn),
    },

    languageOptions: {
      parser: tsParser,
    },

    settings: {
      'import/resolver': {
        typescript: 'true',
        node: 'true',
      },

      react: {
        version: '18.2',
      },
    },

    rules: {
      'consistent-return': 'off',
      'unicorn/expiring-todo-comments': 'off',

      'import/order': [
        'error',
        {
          pathGroups: [
            {
              pattern: '@app/**',
              group: 'external',
              position: 'after',
            },
          ],
        },
      ],

      'no-underscore-dangle': 'off',
      'unicorn/prefer-module': 'off',
      'no-restricted-syntax': 'off',
      'no-irregular-whitespace': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/prefer-query-selector': 'off',
      'no-continue': 'off',
      'import/no-unresolved': [
        2,
        {
          ignore: ['^@app/', '^react-hook-form/dist'],
        },
      ],

      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      'import/prefer-default-export': 'off',

      'react/jsx-props-no-spreading': [
        'error',
        {
          custom: 'ignore',
        },
      ],

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],

      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],

      'react/require-default-props': 'off',
      'react/react-in-jsx-scope': 'off',

      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            Props: true,
            props: true,
            args: true,
            Param: true,
            param: true,
            Params: true,
            params: true,
            Env: true,
            env: true,
            ref: true,
            Ref: true,
            refs: true,
            Refs: true,
            doc: true,
            Doc: true,
            docs: true,
            Docs: true,
            res: true,
            varDirectory: true,
            createVarDirectory: true,
          },
        },
      ],

      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },

          ignore: ['.json$'],
        },
      ],

      'unicorn/no-array-reduce': 'off',
    },
  },
  // Spec
  ...fixupConfigRules(
    compat.extends(
      'turbo',
      'airbnb',
      'airbnb-typescript',
      'airbnb/hooks',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:eslint-comments/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:promise/recommended',
      'plugin:unicorn/recommended',
      'prettier',
      'plugin:jest/recommended',
    ),
  ).map((config) => ({
    ...config,
    files: ['**/*.+(spec|integration).+(ts|tsx)'],
  })),
  {
    files: ['**/*.+(spec|integration).+(ts|tsx)'],

    plugins: {
      jest: fixupPluginRules(jest),
    },

    rules: {
      '@typescript-eslint/no-loop-func': 'off',
      'import/no-extraneous-dependencies': 'off',
      'unicorn/no-null': 'off',
      'no-restricted-syntax': 'off',
      'unicorn/prefer-module': 'off',
    },
  },
  // // E2E
  ...fixupConfigRules(
    compat.extends(
      'turbo',
      'airbnb',
      'airbnb-typescript',
      'airbnb/hooks',
      'plugin:@typescript-eslint/recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:eslint-comments/recommended',
      'plugin:import/recommended',
      'plugin:import/typescript',
      'plugin:promise/recommended',
      'plugin:unicorn/recommended',
      'prettier',
      'plugin:cypress/recommended',
    ),
  ).map((config) => ({
    ...config,
    files: ['./packages/e2e/**/*.+(ts|tsx)'],
  })),
  {
    files: ['./packages/e2e/**/*.+(ts|tsx)'],

    plugins: {
      cypress: fixupPluginRules(cypress),
    },

    languageOptions: {
      parser: tsParser,
    },

    rules: {
      'import/no-extraneous-dependencies': 'off',
      'unicorn/no-null': 'off',
      'import/prefer-default-export': 'off',
      'no-restricted-syntax': 'off',
      'promise/catch-or-return': 'off',
      'promise/always-return': 'off',
      'cypress/unsafe-to-chain-command': 'off',
    },
  },
  // JSON
  ...compat.extends('plugin:json/recommended-legacy').map((config) => ({
    ...config,
    files: ['**/*.json'],
  })),
  {
    files: ['**/*.json'],

    plugins: {
      json,
    },
  },
]
