import { Template } from "../Template.js";

export const aclTemplate = new Template({
  name: "acl",
  targetPath: "./config/acl.js",
  injectionDescriptors: [],
  template: `const acl = require("express-acl");

acl.config({
  baseUrl: "/",
  rules: [
    {
      group: "admin",
      permissions: [
        { resource: "/users", methods: ["GET", "POST", "PUT", "DELETE"], action: "allow" }
      ]
    },
    {
      group: "user",
      permissions: [
        { resource: "/users", methods: ["GET"], action: "allow" }
      ]
    }
  ]
});

module.exports = acl;
`,
});
