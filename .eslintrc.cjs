/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  env: {
    "vue/setup-compiler-macros": true,
    node: true,
    commonjs: true,
    browser: true,
    es6: true,
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": false,
    "@typescript-eslint/no-empty-interface": false,
  },
};
