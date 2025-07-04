import { NextRequest, NextResponse } from "next/server";
import { getUserSettings } from "@/lib/db/userPrefs";
import { auth } from "@/auth";
import { LoggedIn } from "@/lib/auth/types";
import { getStopTimesForStation } from "@/lib/trains/utils/stationTimes";

export async function GET(req: NextRequest) {
  const session = (await auth()) as LoggedIn | null;
  if (!session) {
    return NextResponse.json({ error: "unauth" }, { status: 401 });
  }

  try {
    const settings = await getUserSettings(session.user.email);
    if (!settings) {
      return NextResponse.json({ error: "no user settings" }, { status: 404 });
    }

    const times = await Promise.all(
      settings.stations.map((s) =>
        getStopTimesForStation(
          s.id,
          s.direction === "Northbound" ? "N" : "S",
        ),
      ),
    );
    return NextResponse.json({
      stations: settings.stations,
      times,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
