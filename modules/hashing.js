import { Module } from "./Module.js";

const commonInjectionItems = [
  {
    templateName: "userRouter",
    injectionName: "imports",
    value: 'const { PasswordService } = require("../services/passwordService");',
  },
  {
    templateName: "userRouter",
    injectionName: "routes",
    value: `router.post("/hash", async (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: "Password required" });
  const hash = await PasswordService.hashPassword(password);
  res.json({ hash });
});

router.post("/verify", async (req, res) => {
  const { password, hash } = req.body;
  if (!password || !hash) return res.status(400).json({ error: "Password and hash required" });
  const valid = await PasswordService.compare(password, hash);
  res.json({ valid });
});`,
  },
];
export default new Module({
  key: "hashing",
  label: "Хешування паролів",
  type: "select",
  defaultValue: "bcrypt",
  options: [
    {
      value: "bcrypt",
      injectionItems: [
        { templateName: "passwordService", injectionName: "imports", value: `import bcrypt from "bcrypt";` },
        {
          templateName: "passwordService",
          injectionName: "hashFunction",
          value: `const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10000) || 10000;
return await bcrypt.hash(password, saltRounds);`.trim(),
        },
        {
          templateName: "passwordService",
          injectionName: "compareFunction",
          value: `\nreturn await bcrypt.compare(password, hash);`.trim(),
        },
        { templateName: "packageJson", injectionName: "dependencies", value: { bcrypt: "^6.0.0" } },
        { templateName: "env", injectionName: "params", value: { BCRYPT_SALT_ROUNDS: "10000" } },
        ...commonInjectionItems,
      ],
    },
    {
      value: "argon2",
      injectionItems: [
        { templateName: "passwordService", injectionName: "imports", value: `import argon2 from "argon2";` },
        { templateName: "passwordService", injectionName: "hashFunction", value: `\nreturn await argon2.hash(password);`.trim() },
        {
          templateName: "passwordService",
          injectionName: "compareFunction",
          value: `\nreturn await argon2.verify(hash, password);`.trim(),
        },
        { templateName: "packageJson", injectionName: "dependencies", value: { argon2: "^0.43.0" } },
        ...commonInjectionItems,
      ],
    },
    {
      value: null,
      injectionItems: [],
    },
  ],
});
