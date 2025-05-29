import { Template } from "../Template.js";

export const appJsTemplate = new Template({
  name: "app",
  targetPath: "./app.js",
  injectionDescriptors: [
    {
      name: "imports",
      defaultValue: "const express = require('express');",
      type: "codeblock",
    },
    {
      name: "middleware",
      defaultValue: "// no middleware selected",
      type: "codeblock",
    },
    {
      name: "serverListener",
      defaultValue: `const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(\`HTTP server running on port \${port}\`);
});`,
      type: "codeblock",
    },
  ],
  template: `{{{imports}}}
const userRouter = require('./routers/user.js');

const app = express();

{{{middleware}}}

app.use("/user", userRouter);

{{{serverListener}}}
`,
});
