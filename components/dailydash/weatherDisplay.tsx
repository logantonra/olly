"use client";

import { useEffect, useState, useCallback } from "react";
import { getWeatherIcon } from "@/lib/weather/utils/getWeatherTheme";

interface ApiForecast {
  time: string;
  temperature: number;
  code: number;
}

interface WeatherPayload {
  temperature: number;
  code: number;
  forecast: ApiForecast[];
  softInfo: { description: string };
  location: string;
}

export function WeatherDisplay() {
  const [weather, setWeather] = useState<WeatherPayload | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = useCallback(async () => {
    try {
      const res = await fetch("/api/weather", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("fetch failed");
      const data: WeatherPayload = await res.json();
      setWeather(data);
    } catch (err) {
      console.error("weather error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  /* first load + refresh every 20 min */
  useEffect(() => {
    fetchWeather();
    const id = setInterval(fetchWeather, 20_000);
    return () => clearInterval(id);
  }, [fetchWeather]);

  if (loading && !weather) return null;

  const code = weather?.code ?? 3;
  const WeatherIcon = getWeatherIcon(code);

  return (
    <div className="flex-1 text-center">
      <div className="text-white">
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="text-lg font-light capitalize opacity-80">
            {weather?.location ?? "Loading weather..."}
          </span>
        </div>

        {weather && (
          <>
            <div className="mb-4 flex items-center justify-center gap-4">
              <WeatherIcon className="h-16 w-16" />
              <div className="text-7xl font-thin">{weather.temperature}°</div>
            </div>

            <div className="mb-6 text-xl font-light opacity-90">
              {weather.softInfo.description}
            </div>

            <div className="flex justify-center gap-6">
              {weather.forecast.map((h, i) => (
                <div key={i} className="text-center">
                  <div className="mb-1 text-sm opacity-80">{h.time}</div>
                  <div className="text-lg font-medium">{h.temperature}°</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
