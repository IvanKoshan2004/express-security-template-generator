import { Module } from "./Module.js";

export const modules = [
  new Module({
    key: "logging",
    label: "Логування",
    type: "toggle",
    defaultValue: true,
  }),
  new Module({
    key: "hashing",
    label: "Хешування паролів",
    type: "select",
    defaultValue: "bcrypt",
    options: ["bcrypt", "argon2", null],
  }),
  new Module({
    key: "tls",
    label: "Шифрування трафіку (TLS)",
    type: "toggle",
    defaultValue: true,
  }),
  new Module({
    key: "acl",
    label: "Контроль доступу (ACL)",
    type: "toggle",
    defaultValue: true,
  }),
  new Module({
    key: "http",
    label: "HTTP-заголовки",
    type: "toggle",
    defaultValue: true,
  }),
  new Module({
    key: "ci",
    label: "CI/CD",
    type: "toggle",
    defaultValue: true,
  }),
];
