import { NextRequest, NextResponse } from "next/server";
import { saveLocation } from "@/lib/db/saveLocation";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "unauth" }, { status: 401 });
  }

  /* body is the location object itself */
  const loc = await req.json();

  try {
    await saveLocation(loc);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
