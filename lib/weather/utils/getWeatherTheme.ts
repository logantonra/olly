import { WEATHER_CODE_MAP } from "@/lib/weather/weatherConfig"
import { WeatherTheme, softWeatherInfo } from "@/lib/weather/utils/types"
import { CloudLightning } from "lucide-react";

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
  
    return { theme: "partly-cloudy", description: "Unknown weather", icon: CloudLightning };
}

