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
            "eslint": "^9.27.0",
            "eslint-plugin-security": "^3.0.1",
          },
        },
        {
          templateName: "packageJson",
          injectionName: "scripts",
          value: { lint: "eslint . --ext .js" },
        },
        {
          templateName: "eslint",
          injectionName: "file",
          value: true,
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
              "name": "semgrep/ci",
              "runs-on": "ubuntu-latest",
              "container": {
                image: "semgrep/semgrep",
              },
              "steps": [
                { name: "Checkout code", uses: "actions/checkout@v4" },
                { name: "Run Semgrep CI", run: "semgrep ci", env: { SEMGREP_APP_TOKEN: "${{ secrets.SEMGREP_APP_TOKEN }}" } },
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
