import { appJsTemplate } from "./fileTemplates/app.js";
import { caslTemplate } from "./fileTemplates/casl.js";
import { cicdTemplate } from "./fileTemplates/cicd.js";
import { envTemplate } from "./fileTemplates/env.js";
import { eslintTemplate } from "./fileTemplates/eslint.js";
import { gitignoreTemplate } from "./fileTemplates/gitignore.js";
import { loggerServiceTemplate } from "./fileTemplates/loggerService.js";
import { packageJsonTemplate } from "./fileTemplates/packageJson.js";
import { passwordServiceTemplate } from "./fileTemplates/passwordService.js";
import { userRouterTemplate } from "./fileTemplates/routes.js";
import { tlsTemplates } from "./fileTemplates/tls.js";

export const templates = [
  appJsTemplate,
  caslTemplate,
  cicdTemplate,
  envTemplate,
  eslintTemplate,
  gitignoreTemplate,
  loggerServiceTemplate,
  packageJsonTemplate,
  passwordServiceTemplate,
  userRouterTemplate,
  tlsTemplates,
].flat();
