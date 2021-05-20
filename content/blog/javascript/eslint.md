---
title: 'EsLint - Javascript Code Linter'
description: 'Detect errors and adhere to code style-guides with eslint'
date: '2021-01-04'
author: 'André Kovac'
category: 'framework'
tags: ['javascript', 'linter']
---

## EsLint config file

For a React Native TypeScript setup:

```js:title=.eslintrc.js
module.exports = {
  root: true,
  env: {
    'react-native/react-native': true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react', 'react-native', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react-native/sort-styles': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars-experimental': 'off',
    '@typescript-eslint/explicit-module-boundary-types': {
      allowDirectConstAssertionInArrowFunctions: true
    },
    'no-unused-vars': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
```