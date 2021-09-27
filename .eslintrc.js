module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ['react-app', 'plugin:@typescript-eslint/recommended', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['node_modules', 'build', 'src/theme.js'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/prop-types': 0,
    'no-prototype-builtins': 0,
    'space-before-function-paren': 0,
    camelcase: 0,
    indent: 0,
    'no-debugger': 1,
    'no-console': 1,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-non-null-assertion': 0
  }
}
