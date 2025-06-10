"use client";

import { useState } from "react";
import { Cloud } from "lucide-react";
import { useWeather } from "@/lib/weather/useWeather";
import { LocationSelector } from "@/components/mainpage/sub_components/locationSelector";
import { getWeatherIcon } from "@/lib/weather/utils/getWeatherTheme";

export function WeatherDisplay() {
  const [tempLocation, setTempLocation] = useState("Manhattan");
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
