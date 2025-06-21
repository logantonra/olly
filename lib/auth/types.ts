import { auth } from "@/auth";
export type LoggedIn = NonNullable<Awaited<ReturnType<typeof auth>>> & {
  user: { email: string };
};