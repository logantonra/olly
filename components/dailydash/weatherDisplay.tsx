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
  // Time stuff
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 5000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  // Weather stuff
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
  // TODO: make this more dynamic. In a rush, ships tomorrow!
  const night = new Set(["10pm", "12am", "2am", "4am", "6am"]);

  return (
    <>
      <div className="flex-1">
        <div className="flex-shrink-0">
          <div className="text-white/90">
            <div className="mb-[-4rem] text-[11rem] font-light">
              {formatTime(currentTime)}
            </div>
            <div className="mt-[-2rem] text-[3rem] font-light opacity-80">
              {formatDate(currentTime)}
            </div>
          </div>
        </div>
        <hr className="border-t-16 my-8 border-white/20" />

        <div className="text-center text-white">
          {weather && (
            <>
              <div className="mb-4 flex items-center justify-center gap-4">
                <WeatherIcon className="h-64 w-64" />
                <div className="text-[12rem] font-thin">
                  {weather.temperature}°
                </div>
              </div>

              <div className="mb-6 text-[3rem] font-light opacity-90">
                {weather.softInfo.description}
              </div>

              <div className="flex justify-center gap-10">
                {weather.forecast.map((h, i) => (
                  <div key={i} className="text-center">
                    <div className="mb-1 text-[3rem] opacity-80">
                      {h.time.toLowerCase()}
                    </div>
                    <div className="mt-2 flex justify-center">
                      {(() => {
                        const HourIcon = getWeatherIcon(
                          h.code,
                          night.has(h.time.toLowerCase()),
                        );
                        return <HourIcon className="h-16 w-16 opacity-80" />;
                      })()}
                    </div>
                    <div className="text-[3rem] font-medium">
                      {h.temperature}°
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
