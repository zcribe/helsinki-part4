const globals = require('globals')
const js = require('@eslint/js')
const stylisticJs = require('@stylistic/eslint-plugin-js')

module.exports = [
  {
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      '@stylistic/js/indent': [
        'error',
        2
      ],
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/js/quotes': [
        'error',
        'single'
      ],
      '@stylistic/js/semi': [
        'error',
        'never'
      ],
    },
  },

  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node }, 
      ecmaVersion: 'latest',
    },
    rules: {
      'no-unused-vars': 'error',
      'no-undef': 'error'
    }
  },
  {
    languageOptions: {
      globals: globals.browser 
    }
  }
]
