import { Template } from "../Template.js";

export const caslTemplate = new Template({
  name: "casl",
  targetPath: "./middleware/casl.js",
  injectionDescriptors: [],
  template: `
const { AbilityBuilder, Ability } = require("@casl/ability");

module.exports = function caslMiddleware(req, res, next) {
  // Тут визначається роль користувача, наприклад з req.user.role
  const role = req.user?.role || "guest";
  const { can, cannot, build } = new AbilityBuilder(Ability);
  if (role === "admin") {
    can("manage", "all"); // адміністратор може все
  } else if (role === "user") {
    can("read", "User"); // користувач може лише читати User
  } else {
    can("read", "Public");
  }
  req.ability = build();
  next();
};
`,
});
