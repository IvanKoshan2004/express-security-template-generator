import { Module } from "./Module.js";

export default new Module({
  key: "logging",
  label: "Логування",
  type: "toggle",
  defaultValue: true,
  options: [
    {
      value: true,
      injectionItems: [
        { templateName: "app", injectionName: "imports", value: 'const morgan = require("morgan")' },
        { templateName: "app", injectionName: "imports", value: 'const logger = require("./services/loggerService")' },
        { templateName: "app", injectionName: "middleware", value: 'app.use(morgan("combined", { stream: logger.stream }))' },
        { templateName: "packageJson", injectionName: "dependencies", value: { winston: "^3.17.0", morgan: "^1.10.0" } },
        { templateName: "gitignore", injectionName: "ignored_files", value: "logs/\n*.log\n!logs/.gitkeep" },
      ],
    },
  ],
});
