'use strict';

module.exports = {
  root: true,
  extends: [ 'standard', 'prettier' ],
  plugins: [],
  env: {
    browser: true,
    node: true,
    es6: true,
    commonjs: true,
    jest: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false
  },
  rules: {}
};
