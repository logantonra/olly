import { Resource } from "sst";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const client = new SESv2Client(); 

export async function sendVerificationEmail(email: string, code: string): Promise<void> {
  try {
    const emailAddress = typeof email === 'string' ? email : (email as any).email;
    
    if (!emailAddress || !emailAddress.includes("@")) {
      throw new Error("Invalid email address");
    }

    // Validate code
    if (!code) {
      throw new Error("Verification code is required");
    }

    const fromEmail = Resource.OllyEmail.sender;

    // Simplified command structure
    const command = new SendEmailCommand({
      FromEmailAddress: String(fromEmail).trim(),
      Destination: {
        ToAddresses: [String(emailAddress).trim()],
      },
      Content: {
        Simple: {
          Subject: { 
            Data: "Olly App Verification Code"
          },
          Body: { 
            Text: { 
              Data: `Your verification code is: ${code}. Enjoy using Olly! If you did not request this code, please ignore this email.`
            },
          },
        },
      },
    });

    console.log("Command payload:", JSON.stringify(command, null, 2));

    const result = await client.send(command);
    console.log("Email sent successfully:", result.MessageId);
  } catch (error) {
    console.error("Full error object:", JSON.stringify(error, null, 2));
    console.error("Error sending email:", error);
    throw error;
  }
}