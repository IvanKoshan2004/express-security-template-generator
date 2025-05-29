import { Template } from "../Template.js";

export const userRouterTemplate = new Template({
  name: "userRouter",
  targetPath: "./routers/user.js",
  injectionDescriptors: [
    {
      name: "imports",
      defaultValue: "",
      type: "codeblock",
    },
    {
      name: "routes",
      defaultValue: "",
      type: "codeblock",
    },
  ],
  template: `const express = require("express");
{{{imports}}}
const router = express.Router();

// /user routes
{{{routes}}}

module.exports = router;
`,
});
