import { Template } from "../Template.js";

export const gitignoreTemplate = new Template({
  name: "gitignore",
  targetPath: "./.gitignore",
  injectionDescriptors: [
    {
      name: "ignored_files",
      defaultValue: "",
      type: "codeblock",
    },
  ],
  template: `/node_modules
*.env

{{{ignored_files}}}`,
});
