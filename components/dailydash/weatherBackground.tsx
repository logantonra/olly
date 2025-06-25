"use client";

import { useEffect, useState, useCallback } from "react";

type WeatherCondition =
  | "sunny"
  | "partly-cloudy"
  | "cloudy"
  | "light-rain"
  | "rain"
  | "snow"
  | "night"
  | "thunderstorm";

const weatherBackgrounds: Record<WeatherCondition, string> = {
  sunny: "bg-gradient-to-br to-blue-400 via-blue-300 from-yellow-300",
  "partly-cloudy": "bg-gradient-to-br from-blue-400 via-blue-300 to-cyan-300",
  cloudy: "bg-gradient-to-br from-slate-500 via-gray-400 to-sky-300",
  "light-rain": "bg-gradient-to-br from-slate-500 via-gray-400 to-blue-400",
  rain: "bg-gradient-to-br from-slate-600 via-gray-500 to-blue-500",
  snow: "bg-gradient-to-br from-blue-200 via-blue-300 to-sky-500",
  thunderstorm: "bg-gradient-to-br from-slate-900 via-gray-800 to-indigo-900",
  night: "bg-gradient-to-br from-black via-slate-900 to-gray-900",
};

export function WeatherBackground() {
  const [theme, setTheme] = useState<WeatherCondition>("partly-cloudy");
  const [isNight, setIsNight] = useState<Boolean>(false);

  const fetchTheme = useCallback(async () => {
    try {
      const res = await fetch("/api/weather/theme");
      if (!res.ok) {
        console.log("Failed to fetch theme, usning default theme");
        setTheme("partly-cloudy");
      } else {
        const data = await res.json();
        console.log("Fetched theme from API:", data.theme);
        if (data.theme && weatherBackgrounds[data.theme as WeatherCondition]) {
          setTheme(data.theme as WeatherCondition);
        } else {
          console.warn("Unknown theme from API:", data.theme);
        }
        const now = new Date();
        const localHour = now.getHours();
        console.log(localHour);
        // Stricter night time check than just the API response
        // TODO: make night time hours configurable
        if (localHour >= 22 || localHour < 8) {
          setIsNight(true);
        } else {
          setIsNight(data.isNight);
        }
      }
    } catch (err) {
      console.error("Error fetching theme:", err);
    }
  }, []);

  useEffect(() => {
    fetchTheme();
    const interval = setInterval(fetchTheme, 60 * 60 * 1000); // every hour
    return () => clearInterval(interval);
  }, [fetchTheme]);

  const backgroundClass = isNight
    ? weatherBackgrounds["night"]
    : weatherBackgrounds[theme];
  return (
    <div className={`fixed inset-0 ${backgroundClass}`}>
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {theme === "sunny" && (
          <>
            <div className="absolute right-32 top-16 h-24 w-24 animate-pulse rounded-full bg-yellow-300 opacity-80"></div>
            <div className="absolute right-20 top-8 h-32 w-32 animate-pulse rounded-full bg-yellow-200 opacity-40"></div>
            <div className="animate-float absolute left-1/4 top-12 h-12 w-20 rounded-full bg-white opacity-20"></div>
          </>
        )}
        {theme === "partly-cloudy" && (
          <>
            <div className="animate-float absolute left-1/4 top-8 h-16 w-24 rounded-full bg-white opacity-40 blur-sm"></div>
            <div className="animate-float-delayed absolute right-1/3 top-16 h-20 w-32 rounded-full bg-white opacity-30 blur-md"></div>
            <div className="h-18 animate-float-slow absolute left-1/2 top-20 w-28 rounded-full bg-white opacity-25"></div>
            <div className="animate-float absolute top-3/4 h-14 w-24 rounded-full bg-white opacity-25"></div>
            <div className="animate-float-delayed absolute right-1/4 top-2/3 h-16 w-28 rounded-full bg-white opacity-30"></div>
          </>
        )}
        {theme === "cloudy" && (
          <>
            <div className="animate-float absolute left-[10%] top-4 h-24 w-40 rounded-full bg-white opacity-50 blur-sm"></div>
            <div className="animate-float-delayed absolute left-[35%] top-16 h-32 w-52 rounded-full bg-gray-100 opacity-40 blur-md"></div>
            <div className="animate-float absolute left-[60%] top-[35%] h-20 w-36 rounded-full bg-white opacity-60"></div>
            <div className="animate-float-delayed absolute left-[75%] top-[50%] h-24 w-44 rounded-full bg-gray-200 opacity-50"></div>
            <div className="animate-float-slow absolute left-[37%] top-[56%] h-16 w-32 rounded-full bg-white opacity-70 blur-sm"></div>
            <div className="animate-float absolute left-[20%] top-[85%] h-20 w-36 rounded-full bg-white opacity-40 blur-sm"></div>
          </>
        )}

        {theme === "light-rain" && (
          <>
            <div className="absolute inset-0">
              {[...Array(25)].map((_, i) => (
                <div
                  key={i}
                  className="animate-rain absolute h-8 w-0.5 bg-blue-200 opacity-60"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1.2 + Math.random()}s`,
                  }}
                ></div>
              ))}
            </div>
            <div className="left-1/5 h-18 animate-float absolute top-6 w-28 rounded-full bg-gray-400 opacity-50"></div>
            <div className="animate-float-delayed absolute right-1/3 top-10 h-20 w-32 rounded-full bg-gray-500 opacity-40"></div>
          </>
        )}
        {theme === "rain" && (
          <>
            <div className="absolute inset-0">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="animate-rain absolute h-8 w-0.5 bg-blue-200 opacity-60"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`,
                  }}
                ></div>
              ))}
            </div>
            <div className="left-1/5 h-18 animate-float absolute top-6 w-28 rounded-full bg-gray-400 opacity-50"></div>
            <div className="animate-float-delayed absolute right-1/3 top-10 h-20 w-32 rounded-full bg-gray-500 opacity-40"></div>
          </>
        )}
        {theme === "snow" && (
          <>
            <div className="absolute inset-0">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="animate-snow absolute h-2 w-2 rounded-full bg-white opacity-80"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${5 + Math.random() * 2}s`,
                  }}
                ></div>
              ))}
            </div>
            <div className="animate-float absolute left-1/4 top-8 h-20 w-32 rounded-full bg-gray-200 opacity-60"></div>
            <div className="h-18 animate-float-delayed absolute right-1/4 top-12 w-28 rounded-full bg-gray-300 opacity-50"></div>
          </>
        )}
        {theme === "thunderstorm" && (
          <>
            {/* Thunderstorm Clouds */}
            <div className="left-1/5 animate-float absolute top-4 h-24 w-40 rounded-full bg-gray-800 opacity-70"></div>
            <div className="h-22 animate-float-delayed absolute right-1/4 top-8 w-36 rounded-full bg-gray-700 opacity-60"></div>
            <div className="animate-float-slow absolute left-1/2 top-12 h-20 w-32 rounded-full bg-gray-900 opacity-50"></div>

            {/* Lightning Flash */}
            <div className="animate-lightning pointer-events-none absolute inset-0 bg-white opacity-0"></div>

            {/* Rain Drops */}
            <div className="absolute inset-0">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="animate-rain absolute h-8 w-0.5 bg-blue-300 opacity-60"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`,
                  }}
                ></div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
