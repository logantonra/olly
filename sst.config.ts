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
      fromEmail: new sst.Secret("FromEmail"),
      certificate: new sst.Secret("CertificateArn"),
      google_auth_id: new sst.Secret("GoogleAuthId"),
      google_auth_secret: new sst.Secret("GoogleAuthSecret"),
      auth_secret: new sst.Secret("AuthSecret"),
    };

    // table for user sent messages
    // SST only wants key definitions here, but
    // I have included comments for the fields that are not keys for clarity
    const dynamo = {
      user_messages: new sst.aws.Dynamo("Messages", {
        fields: {
        userEmail: "string", // Email of the message recipient
        messageId: "string", // Unique identifier for the message
        // content: "string",
        // senderName: "string", // Name of the message sender
        // ttl: "number",
        },
        primaryIndex: { hashKey: "userEmail", rangeKey: "messageId" },
        ttl: "ttl",
      }),
      devices: new sst.aws.Dynamo("Devices", {
        fields: {
        deviceId: "string", // Unique identifier for the device
        // deviceToken: "string", // Unique token for the device
        // deviceOwner: "string", // Email of the device owner
        },
        primaryIndex: { hashKey: "deviceId" },
      }),
      user_settings: new sst.aws.Dynamo("UserSettings", {
        fields: {
          userEmail: "string", // Email of the user
          // location: "map",
          // stations: "list",
        },
        primaryIndex: { hashKey: "userEmail" },
      }),
    }

    // Create Next.js app with conditional domain
    const site = new sst.aws.Nextjs("DailyDash", {
      link: [secrets, dynamo.devices, dynamo.user_messages, dynamo.user_settings],
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