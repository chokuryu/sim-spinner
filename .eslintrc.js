// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // 解決済
    'no-tabs': 2,

    // 未作業 ( TODO: 下の方から解決しよう )
    'space-before-function-paren': 0,
    'arrow-spacing': 0,
    'space-in-parens': 0,
    'semi': 0,
    'no-multiple-empty-lines': 0,
    'indent': 0,
    'space-infix-ops': 0,
    'padded-blocks': 0,
    'no-useless-constructor': 0,
    'block-spacing': 0,
    'dot-location': 0,
    'space-before-function-paren': 0,
    'key-spacing': 0,
    'template-curly-spacing': 0,
    'spaced-comment': 0,
    'space-before-blocks': 0,
    'comma-style': 0,
    'no-useless-escape': 0,
    'operator-linebreak': 0,
    'no-unused-vars': 0,
    'one-var': 0,
    'comma-spacing': 0,
    'keyword-spacing': 0,
    'no-multi-spaces': 0,
    'no-dupe-keys': 0,
    'comma-dangle': 0,
    'no-undef': 0,


  }
}
