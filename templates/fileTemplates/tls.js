import { Template } from "../Template.js";

const tlsCertStubTemplate = new Template({
  name: "tlsCertStub",
  targetPath: "./credentials/server.cert",
  injectionDescriptors: [],
  template: `-----BEGIN CERTIFICATE-----\nREPLACE_WITH_YOUR_CERTIFICATE\n-----END CERTIFICATE-----\n`,
});

const tlsKeyStubTemplate = new Template({
  name: "tlsKeyStub",
  targetPath: "./credentials/server.key",
  injectionDescriptors: [],
  template: `-----BEGIN PRIVATE KEY-----\nREPLACE_WITH_YOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n`,
});

export const tlsTemplates = [tlsCertStubTemplate, tlsKeyStubTemplate];
