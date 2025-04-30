module.exports = {
  env: {
    browser: true,
    es2015: true,
    worker: true,
    node: true,
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      parserOpts: {
        plugins: ['jsx']
      }
    }
  },
  plugins: ['vue'],
  rules: {
    'no-console': 0,
    'no-': 0,
    'space-before-function-paren': 'off',
    'vue/multi-word-component-names': 'off',
    'prefer-const': 'warn', // 将 'prefer-const' 规则从 'error' 改为 'warning'
    'no-use-before-define': 'warn',
    'no-undef': 'warn',
    'no-unused-vars': ['warn', { ignoreRestSiblings: true, varsIgnorePattern: '^_', argsIgnorePattern: '^_' }]
  }
}
