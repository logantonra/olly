import { NextRequest, NextResponse } from "next/server";
import { saveStations } from "@/lib/db/saveStations"; 
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "unauth" }, { status: 401 });
  }
  const { stations } = await req.json();
  try {
    await saveStations(stations);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}