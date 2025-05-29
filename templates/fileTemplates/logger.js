import { Template } from "../Template.js";

export const loggerServiceTemplate = new Template({
  name: "loggerService",
  targetPath: "./services/loggerService.js",
  injectionDescriptors: [],
  template: `const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(function(info) {
      return \`\${info.timestamp} [\${info.level}]: \${info.message}\`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" })
  ]
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Stream for morgan
logger.stream = {
  write: function(message) {
    logger.info(message.trim());
  }
};

module.exports = logger;
`,
});
