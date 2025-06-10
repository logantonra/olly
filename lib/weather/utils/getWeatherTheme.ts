import { WEATHER_CODE_MAP, WEATHER_ICON_MAP } from "@/lib/weather/weatherConfig"
import { softWeatherInfo } from "@/lib/weather/utils/types"
import { Cloud } from "lucide-react";
import { LucideIcon } from "lucide-react";

/**
 * Returns the closest weather description and theme for a given weathercode.
 */
export function getWeatherInfo(code: number): softWeatherInfo {
    if (WEATHER_CODE_MAP[code]) return WEATHER_CODE_MAP[code] as softWeatherInfo;
  
    // fallback to nearest lower code
    const sortedKeys = Object.keys(WEATHER_CODE_MAP)
      .map(Number)
      .sort((a, b) => a - b);
  
    for (let i = sortedKeys.length - 1; i >= 0; i--) {
      if (sortedKeys[i] <= code) {
        return WEATHER_CODE_MAP[sortedKeys[i]] as softWeatherInfo;
      }
    }
  
    return { theme: "partly-cloudy", description: "Unknown weather" };
}

/**
 * Returns the appropriate Lucide icon for a given weather code.
 */
export function getWeatherIcon(code: number): LucideIcon {
    if (WEATHER_ICON_MAP[code]) return WEATHER_ICON_MAP[code];

    // fallback to nearest lower code
    const sortedKeys = Object.keys(WEATHER_ICON_MAP)
      .map(Number)
      .sort((a, b) => a - b);

    for (let i = sortedKeys.length - 1; i >= 0; i--) {
      if (sortedKeys[i] <= code) {
        return WEATHER_ICON_MAP[sortedKeys[i]];
      }
    }

    return Cloud; // fallback icon
}

