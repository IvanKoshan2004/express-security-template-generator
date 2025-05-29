import { Module } from "./Module.js";

export default new Module({
  key: "http",
  label: "HTTP-заголовки",
  type: "toggle",
  defaultValue: true,
  options: [
    {
      value: true,
      injectionItems: [
        { templateName: "app", injectionName: "imports", value: 'const helmet = require("helmet")' },
        { templateName: "app", injectionName: "imports", value: 'const hpp = require("hpp")' },
        { templateName: "app", injectionName: "middleware", value: "app.use(helmet())" },
        { templateName: "app", injectionName: "middleware", value: "app.use(hpp())" },
        { templateName: "packageJson", injectionName: "dependencies", value: { helmet: "^7.0.0", hpp: "^0.2.3" } },
      ],
    },
  ],
});
