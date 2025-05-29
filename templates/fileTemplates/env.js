import { Template } from "../Template.js";

export const envTemplate = new Template({
  name: "env",
  targetPath: "./.env.example",
  injectionDescriptors: [
    {
      name: "params",
      defaultValue: {},
      type: "envVariables",
    },
  ],
  template: `{{{params}}}`,
});
