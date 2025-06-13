import { handle } from "hono/aws-lambda"
import { issuer } from "@openauthjs/openauth"
import { CodeUI } from "@openauthjs/openauth/ui/code"
import { CodeProvider } from "@openauthjs/openauth/provider/code"
import { MemoryStorage } from "@openauthjs/openauth/storage/memory"
import { subjects } from "./subjects"
import { sendVerificationEmail} from "@/lib/email/verificationEmail"

async function getUser(email: string) {
  // Get user from database and return user ID
  return "123"
}

const app = issuer({
  subjects,
  storage: MemoryStorage(),
  // Remove after setting custom domain
  allow: async () => true,
  providers: {
    code: CodeProvider(
      CodeUI({
        sendCode: async (email, code) => {
          const cleamail = typeof email === "string" ? email : email.email;
          sendVerificationEmail(cleamail, code)
        },
      }),
    ),
  },
  success: async (ctx, value) => {
    if (value.provider === "code") {
      return ctx.subject("user", {
        id: await getUser(value.claims.email)
      })
    }
    throw new Error("Invalid provider")
  },
})


export const handler = handle(app)