import { Module } from "./Module.js";

export default new Module({
  key: "ci",
  label: "CI/CD",
  type: "toggle",
  defaultValue: true,
  options: [
    {
      value: true,
      injectionItems: [
        {
          templateName: "packageJson",
          injectionName: "devDependencies",
          value: {
            "eslint": "^8.57.0",
            "semgrep": "^1.72.0",
            "eslint-plugin-security": "^1.7.1",
            "eslint-plugin-no-secrets": "^0.8.8",
          },
        },
        {
          templateName: "packageJson",
          injectionName: "scripts",
          value: { lint: "eslint . --ext .js", semgrep: "semgrep --config=auto ." },
        },
        {
          templateName: "eslint",
          injectionName: "eslintConfig",
          value: {
            "no-unused-vars": "warn",
            "no-console": "off",
            "semi": ["error", "always"],
            "quotes": ["error", "double"],
          },
        },
        {
          templateName: "eslint",
          injectionName: "eslintExtends",
          value: ["plugin:security/recommended", "plugin:no-secrets/recommended"],
        },
        {
          templateName: "eslint",
          injectionName: "eslintPlugins",
          value: ["security", "no-secrets"],
        },
        {
          templateName: "cicd",
          injectionName: "jobs",
          value: {
            lint: {
              "runs-on": "ubuntu-latest",
              "steps": [
                { name: "Checkout code", uses: "actions/checkout@v4" },
                { name: "Setup Node.js", uses: "actions/setup-node@v4", with: { "node-version": "20" } },
                { name: "Install dependencies", run: "npm ci" },
                { name: "Run ESLint", run: "npm run lint" },
              ],
            },
            semgrep: {
              "runs-on": "ubuntu-latest",
              "steps": [
                { name: "Checkout code", uses: "actions/checkout@v4" },
                { name: "Install Semgrep", run: "pip install semgrep" },
                { name: "Run Semgrep", run: "npm run semgrep" },
              ],
            },
            audit: {
              "runs-on": "ubuntu-latest",
              "steps": [
                { name: "Checkout code", uses: "actions/checkout@v4" },
                { name: "Setup Node.js", uses: "actions/setup-node@v4", with: { "node-version": "20" } },
                { name: "Install dependencies", run: "npm ci" },
                { name: "Run npm audit", run: "npm audit --audit-level=high" },
              ],
            },
          },
        },
      ],
    },
  ],
});
