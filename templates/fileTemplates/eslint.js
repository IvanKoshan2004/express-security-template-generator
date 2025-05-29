import { Template } from "../Template.js";

export const eslintTemplate = new Template({
  name: "eslint",
  targetPath: "./.eslintrc.json",
  injectionDescriptors: [
    {
      name: "eslintConfig",
      defaultValue: {},
      type: "object",
    },
    {
      name: "eslintExtends",
      defaultValue: ["eslint:recommended"],
      type: "array",
    },
    {
      name: "eslintPlugins",
      defaultValue: [],
      type: "array",
    },
  ],
  template: `{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": {{{eslintExtends}}},
  "plugins": {{{eslintPlugins}}},
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {{{eslintConfig}}}
}`,
});
