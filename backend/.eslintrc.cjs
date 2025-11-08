module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module'
  },
  env: {
    node: true,
    es2021: true
  },
  plugins: ['@typescript-eslint', 'import'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:import/recommended', 'prettier'],
  rules: {
    'import/order': ['error', { 'alphabetize': { order: 'asc', caseInsensitive: true }, 'newlines-between': 'never' }],
    '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }]
  }
};


