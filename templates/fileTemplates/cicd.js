import { Template } from "../Template.js";

export const cicdTemplate = new Template({
  name: "cicd",
  targetPath: "./.github/workflows/security.yml",
  injectionDescriptors: [
    {
      name: "jobs",
      defaultValue: "",
      options: {
        indentation: 2,
      },
      type: "yml",
    },
  ],
  template: `name: Security CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
{{{jobs}}}
`,
});
