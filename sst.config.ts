// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "daily-dash",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    // Get the current stage
    const stage = $app.stage;

    // Get secrets from SST
    const secrets = {
      domain: new sst.Secret("Domain"),
      authDomain: new sst.Secret("AuthDomain"),
      fromEmail: new sst.Secret("FromEmail"),
      certificate: new sst.Secret("CertificateArn"),
      google_auth_id: new sst.Secret("GoogleAuthId"),
      google_auth_secret: new sst.Secret("GoogleAuthSecret"),
      auth_secret: new sst.Secret("AuthSecret"),
    };

    // Create your Next.js app with conditional domain
    const site = new sst.aws.Nextjs("DailyDash", {
      link: [secrets],
      environment: {
        AUTH_SECRET: secrets.auth_secret.value,
        AUTH_GOOGLE_ID: secrets.google_auth_id.value,
        AUTH_GOOGLE_SECRET: secrets.google_auth_secret.value,
      },
      ...(stage === "production" && {
        domain: {
          name: secrets.domain.value,
        }
      }),
    });

    // Return the URLs for easy access
    return {
      site: site.url,
      stage: stage,
    };
  },
});