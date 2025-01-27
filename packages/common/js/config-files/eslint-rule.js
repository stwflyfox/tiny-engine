import eslintRecommended from '@eslint/js/src/configs/eslint-recommended.js'
export default {
  ...eslintRecommended.rules,
  'no-console': 'warning',
  'no-debugger': 'warning',
  'space-before-function-paren': 'off',
  'no-use-before-define': 'error'
}
