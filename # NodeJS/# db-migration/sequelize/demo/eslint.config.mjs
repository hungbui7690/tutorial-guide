import globals from 'globals'
import pluginJs from '@eslint/js'

export default [
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: { 'no-undef': 'off', 'no-unused-vars': 'off' },
  },
  pluginJs.configs.recommended,
]