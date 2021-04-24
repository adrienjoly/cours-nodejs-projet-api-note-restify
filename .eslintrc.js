module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    'prettier/prettier': [
      {
        singleQuote: true,
        semi: false,
        trailingComma: 'none'
      }
    ]
  }
};
