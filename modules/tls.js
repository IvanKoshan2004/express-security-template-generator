import { Module } from "./Module.js";

export default new Module({
  key: "tls",
  label: "Шифрування трафіку (TLS)",
  type: "toggle",
  defaultValue: true,
  options: [
    {
      value: true,
      injectionItems: [
        { templateName: "app", injectionName: "imports", value: 'const fs = require("fs")' },
        { templateName: "app", injectionName: "imports", value: 'const https = require("https")' },
        { templateName: "app", injectionName: "imports", value: 'const path = require("path");' },
        {
          templateName: "app",
          injectionName: "serverListener",
          value: `
if (process.env.HTTPS === "true") {
  const certPath = process.env.TLS_CERT_PATH || path.join(__dirname, "credentials", "server.cert");
  const keyPath = process.env.TLS_KEY_PATH || path.join(__dirname, "credentials", "server.key");
  const credentials = {
    cert: fs.readFileSync(certPath),
    key: fs.readFileSync(keyPath),
  };
  const server = https.createServer(credentials, app);
  const port = process.env.PORT || 8000;
  server.listen(port, () => {
    console.log(\`HTTPS server running on port \${port}\`);
  });
} else {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(\`HTTP server running on port \${port}\`);
  });
}
`,
        },
        { templateName: "gitignore", injectionName: "ignored_files", value: "/credentials" },
        {
          templateName: "env",
          injectionName: "params",
          value: { HTTPS: "true", TLS_CERT_PATH: "./credentials/server.cert", TLS_KEY_PATH: "./credentials/server.key" },
        },
      ],
    },
  ],
});
