import { Module } from "./Module.js";

export default new Module({
  key: "acl",
  label: "Контроль доступу (ACL)",
  type: "toggle",
  defaultValue: true,
  options: [
    {
      value: true,
      injectionItems: [
        { templateName: "aclConfig", injectionName: "file", value: true },
        { templateName: "app", injectionName: "imports", value: 'const acl = require("./config/acl")' },
        { templateName: "app", injectionName: "middleware", value: "app.use(acl)" },
        { templateName: "packageJson", injectionName: "dependencies", value: { "express-acl": "^1.1.1" } },
      ],
    },
  ],
});
