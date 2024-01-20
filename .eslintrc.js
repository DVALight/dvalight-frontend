module.exports = {
  env: {
    node: true,
  },
  root: true,
  ignorePatterns: [".eslintrc.js"],
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
};
