import { NextRequest, NextResponse } from "next/server";
import { writeMessage } from "@/lib/db/userMessages";
import { auth } from "@/auth";
import { LoggedIn } from "@/lib/auth/types";

export async function POST(
  req: NextRequest,
  { params }: { params: { userId: string } },
) {
  const session = (await auth()) as LoggedIn | null;
  if (!session) {
    return NextResponse.json({ error: "unauth" }, { status: 401 });
  }

  const { userId } = params;

  let cleanUserEmail = userId.replace(/\s+/g, "").replace(/[^a-zA-Z0-9@.]/g, "").toLowerCase();
  if (!cleanUserEmail.endsWith("@gmail.com")) {
    cleanUserEmail += "@gmail.com";
  }

  const body = await req.json();
  const message = body?.message;

  if (!message || typeof message !== "string") {
    return NextResponse.json({ error: "invalid message" }, { status: 400 });
  }

  const senderName = (session.user.name || session.user.email.split("@")[0]);
  try {
    const saved = await writeMessage({
      userEmail: cleanUserEmail,
      content: message,
      senderName: senderName, 
    });

    return NextResponse.json({message: "successfully wrote message", messageId: saved.messageId });
  } catch (err) {
    console.error("Failed to write message:", err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
