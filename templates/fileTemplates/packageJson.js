import { Template } from "../Template.js";

export const packageJsonTemplate = new Template({
  name: "packageJson",
  targetPath: "./package.json",
  injectionDescriptors: [
    {
      name: "name",
      defaultValue: "projectName",
      type: "string",
    },
    {
      name: "scripts",
      defaultValue: {},
      type: "object",
    },
    {
      name: "dependencies",
      defaultValue: {},
      options: {
        sorted: true,
      },
      type: "object",
    },
    {
      name: "devDependencies",
      defaultValue: {},
      options: {
        sorted: true,
      },
      type: "object",
    },
  ],
  template: `{
  "name": "{{{name}}}",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {{{scripts}}},
  "dependencies": {{{dependencies}}},
  "devDependencies": {{{devDependencies}}}
}
`,
});
