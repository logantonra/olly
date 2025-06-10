import { NextRequest, NextResponse } from "next/server";
import { BOROUGH_COORDS } from "@/lib/weather/weatherConfig";
import { getWeatherInfo } from "@/lib/weather/utils/getWeatherTheme";
import { celsiusToFahrenheit } from "@/lib/weather/utils/temperature";
import { formatTime } from "@/lib/weather/utils/formatTime";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const borough = searchParams.get("borough")?.toLowerCase();

  if (!borough || !(borough in BOROUGH_COORDS)) {
    return NextResponse.json(
      { error: "Missing or invalid borough" },
      { status: 400 },
    );
  }

  const { lat, lon } = BOROUGH_COORDS[borough];

  const weatherRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode&timezone=America/New_York`,
    { cache: "no-store" },
  );

  if (!weatherRes.ok) {
    return NextResponse.json(
      { error: "Failed to fetch weather" },
      { status: 500 },
    );
  }

  const data = await weatherRes.json();
  const code = data.current_weather.weathercode;
  const descriptionData = getWeatherInfo(code);

  const now = new Date();
  const hours = data.hourly.time.map((t: string) => new Date(t));

  const next10Every2Hours = [];
  for (let i = 0; i < hours.length; i++) {
    const hour = hours[i];
    if (hour > now && hour.getHours() % 2 === 0) {
      next10Every2Hours.push({
        time: formatTime(hour.getHours()),
        temperature: celsiusToFahrenheit(data.hourly.temperature_2m[i]),
        code: data.hourly.weathercode[i],
      });
    }
    if (next10Every2Hours.length === 5) break;
  }

  return NextResponse.json({
    temperature: celsiusToFahrenheit(data.current_weather.temperature),
    code: code,
    forecast: next10Every2Hours,
    softInfo: descriptionData,
  });
}
