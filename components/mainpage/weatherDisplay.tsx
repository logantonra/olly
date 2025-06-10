"use client";

import { useState } from "react";
import { Cloud } from "lucide-react";
import { useWeather } from "@/lib/weather/useWeather";
import { LocationSelector } from "@/components/mainpage/sub_components/locationSelector";
import { getWeatherIcon } from "@/lib/weather/utils/getWeatherTheme";

const mockWeatherData = {
  current: {
    temp: 72,
    condition: "partly-cloudy" as const,
    description: "Partly cloudy with gentle breeze",
    icon: Cloud,
  },
  hourly: [
    { time: "Now", temp: 72, condition: "partly-cloudy" },
    { time: "2 PM", temp: 75, condition: "sunny" },
    { time: "4 PM", temp: 78, condition: "sunny" },
    { time: "6 PM", temp: 74, condition: "cloudy" },
    { time: "8 PM", temp: 69, condition: "light-rain" },
  ],
};

export function WeatherDisplay() {
  const [tempLocation, setTempLocation] = useState("Manhattan");
  const currentWeather = mockWeatherData.current;
  const { weather, loading } = useWeather(tempLocation);
  const code = weather?.code ?? 3;
  const WeatherIcon = getWeatherIcon(code);

  return (
    <div className="flex-1 text-center">
      <div className="text-white">
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="text-lg font-light capitalize opacity-80">
            {tempLocation + ", NY"}
          </span>
          <LocationSelector
            tempLocation={tempLocation}
            setTempLocation={setTempLocation}
          />
        </div>

        {weather !== null && (
          <>
            {" "}
            <div className="mb-4 flex items-center justify-center gap-4">
              <WeatherIcon className="h-16 w-16" />
              <div className="text-7xl font-thin">{weather.temperature}°</div>
            </div>
            <div className="mb-6 text-xl font-light opacity-90">
              {weather.softInfo.description}
            </div>
            {/* Hourly Forecast */}
            <div className="flex justify-center gap-6">
              {weather.forecast.map((hour, i) => (
                <div key={i} className="text-center">
                  <div className="mb-1 text-sm opacity-80">{hour.time}</div>
                  <div className="text-lg font-medium">{hour.temperature}°</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export { mockWeatherData };
