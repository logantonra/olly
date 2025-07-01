import { NextRequest, NextResponse } from "next/server";
import { getWeatherInfo } from "@/lib/weather/utils/getWeatherTheme";
import { getUserSettings } from "@/lib/db/userPrefs";
import { auth } from "@/auth";
import { LoggedIn } from "@/lib/auth/types";

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

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${settings.location.lat}&longitude=${settings.location.long}&current_weather=true&hourly=temperature_2m,weathercode&timezone=America/New_York`,
      { cache: "no-store" },
    );

    if (!weatherRes.ok) {
      return NextResponse.json({
        error: "Failed to fetch weather",
        status: 500,
      });
    }
    const data = await weatherRes.json();
    const code = data.current_weather.weathercode;

    const isNight =
      data.current_weather.is_day !== undefined
        ? data.current_weather.is_day !== 1
        : false;

    return NextResponse.json({
      theme: getWeatherInfo(code).theme,
      night: isNight,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
