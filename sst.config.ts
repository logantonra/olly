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
    };
    
    // Create the Auth component
    const auth = new sst.aws.Auth("OllyAuth", {
      issuer: "auth/index.handler",
      ...(stage === "production" && {
        domain: secrets.authDomain.value
      }),
    });

    // Create your Next.js app with conditional domain
    const site = new sst.aws.Nextjs("DailyDash", {
      link: [auth, secrets],
      environment: {
        NEXT_PUBLIC_AUTH_URL: auth.url,
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
      auth: auth.url,
      stage: stage,
    };
  },
});