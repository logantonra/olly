import { NextRequest, NextResponse } from "next/server";
import { listUserMessages } from "@/lib/db/userMessages";
import { auth } from "@/auth";
import { LoggedIn } from "@/lib/auth/types";

export async function GET(req: NextRequest) {
  const session = (await auth()) as LoggedIn | null;
  if (!session) {
    return NextResponse.json({ error: "unauth" }, { status: 401 });
  }

  try {
    const all = await listUserMessages(session.user.email);

    const now = Math.floor(Date.now() / 1000);
    const active = all.filter(m => !m.ttl || m.ttl > now);

    return NextResponse.json({ messages: active });
  } catch (err) {
    console.error("messages route failed", err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
