import { Template } from "../Template.js";

export const passwordServiceTemplate = new Template({
  name: "passwordService",
  targetPath: "./services/passwordService.js",
  skipWithoutInjections: true,
  injectionDescriptors: [
    {
      name: "imports",
      defaultValue: "",
      type: "codeblock",
    },
    {
      name: "hashFunction",
      defaultValue: "// hashPassword implementation",
      options: {
        indentation: 4,
      },
      type: "codeblock",
    },
    {
      name: "compareFunction",
      defaultValue: "// compare implementation",
      options: {
        indentation: 4,
      },
      type: "codeblock",
    },
  ],
  template: `{{{imports}}}

class PasswordService {
  async hashPassword(password) {
{{{hashFunction}}}
  }

  async compare(password, hash) {
{{{compareFunction}}}
  }
}

export default new PasswordService();
`,
});
