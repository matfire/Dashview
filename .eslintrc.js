/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["@remix-run/eslint-config", "@remix-run/eslint-config/node"],
  ignorePatterns: ["**/*.spec.ts", "**/*.spec.tsx"],
  rules: {
    indent: ["error", 2],
  },
};
