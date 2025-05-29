import { Module } from "./Module.js";

export default new Module({
  key: "default",
  label: "default",
  type: "toggle",
  defaultValue: true,
  hide: true,
  options: [
    {
      value: true,
      injectionItems: [
        { templateName: "app", injectionName: "imports", value: 'const express = require("express")' },
        { templateName: "app", injectionName: "imports", value: 'require("dotenv").config()' },
        { templateName: "app", injectionName: "middleware", value: "app.use(express.json())" },
        { templateName: "env", injectionName: "params", value: { PORT: "8000", NODE_ENV: "development" } },
        { templateName: "packageJson", injectionName: "name", value: "name" },
        { templateName: "packageJson", injectionName: "scripts", value: { start: "node ./app.js" } },
        { templateName: "packageJson", injectionName: "dependencies", value: { express: "^5.10.0", dotenv: "^16.4.5" } },
      ],
    },
  ],
});
