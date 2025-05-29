import { Module } from "./Module.js";

export default new Module({
  key: "casl",
  label: "Контроль доступу (CASL)",
  type: "toggle",
  defaultValue: true,
  options: [
    {
      value: true,
      injectionItems: [
        {
          templateName: "packageJson",
          injectionName: "dependencies",
          value: { "@casl/ability": "^6.7.2" },
        },
        { templateName: "app", injectionName: "imports", value: 'const caslMiddleware = require("./middleware/casl");' },
        { templateName: "app", injectionName: "middleware", value: "app.use(caslMiddleware);" },
        {
          templateName: "userRouter",
          injectionName: "routes",
          value: `
router.get("/profile", (req, res) => {
  if (req.ability.can("read", "User")) {
    res.json({ message: "Ви маєте доступ до профілю!" });
  } else {
    res.status(403).json({ error: "Доступ заборонено" });
  }
});`,
        },
      ],
    },
  ],
});
