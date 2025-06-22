import { NextRequest, NextResponse } from "next/server";
import { getUserSettings } from "@/lib/db/userPrefs";
import { auth } from "@/auth";
import { LoggedIn } from "@/lib/auth/types";

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  const session = (await auth()) as LoggedIn | null;
  if (!session) {
    return NextResponse.json({ error: "unauth" }, { status: 401 });
  }
  const { userId } = params;
  // TODO: add nickname/ username feature that users can set
  let cleanuserId = userId.replace(/\s+/g, "").replace(/[^a-zA-Z0-9@.]/g, "");
  if (!cleanuserId.endsWith("@gmail.com")) {
    cleanuserId += "@gmail.com";
  }

  try {
    const settings = await getUserSettings(cleanuserId);
    if (!settings) {
      return NextResponse.json({ userExists: false }, { status: 404 });
    }

    return NextResponse.json({ userExists: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
