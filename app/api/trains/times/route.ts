import { NextRequest, NextResponse } from "next/server";
import { getUserSettings } from "@/lib/db/userPrefs";
import { auth } from "@/auth";
import { LoggedIn } from "@/lib/auth/types";
import { getStopTimesForStation } from "@/lib/trains/utils/stationTimes";

export async function GET(req: NextRequest) {
  const session = await auth() as LoggedIn | null; 
  if (!session) {
    return NextResponse.json({ error: "unauth" }, { status: 401 });
  }

  try {
    const settings = await getUserSettings(session.user.email);
    if (!settings) {
      return NextResponse.json({ error: "no user settings" }, { status: 404 });
    }
    const directions = settings.stations.map(station =>
      station.direction === "Northbound" ? "N" : "S"
    );
    const times = await Promise.all([
      getStopTimesForStation(settings.stations[0].name, directions[0]),
      getStopTimesForStation(settings.stations[1].name, directions[1])
    ]);
    const [times1, times2] = times;
    console.log("Times for stations:", times1, times2);

    return NextResponse.json(settings);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
