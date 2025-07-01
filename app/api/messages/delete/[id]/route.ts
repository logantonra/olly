import { NextRequest, NextResponse } from "next/server";
import { deleteMessage } from "@/lib/db/userMessages";
import { auth } from "@/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    await deleteMessage(session.user.email, params.id);
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "delete failed" }, { status: 500 });
  }
}
