// app/api/stop-times/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getStopTimesForStation } from "@/lib/trains/utils/stationTimes";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const stationId = searchParams.get("stationId");
  const direction = searchParams.get("direction");

  if (!stationId || !direction) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const times = await getStopTimesForStation(stationId, direction as "N" | "S");

  return NextResponse.json({ times });
}
