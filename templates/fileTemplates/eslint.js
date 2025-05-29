import { Template } from "../Template.js";

export const eslintTemplate = new Template({
  name: "eslint",
  targetPath: "./eslint.config.js",
  injectionDescriptors: [
    {
      name: "file",
      type: "string",
    },
  ],
  template: `
const security = require("eslint-plugin-security");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      security,
    },
    rules: {
      ...security.configs.recommended.rules,,
      "no-unused-vars": "warn",
      "no-console": "off",
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
    },
  },
];`,
});
