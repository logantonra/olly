import { useEffect, useState } from "react";
import { fullWeatherData } from "./utils/types";

export function useWeather(borough: string) {
  const [weather, setWeather] = useState<fullWeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!borough) return;
    borough = borough.toLowerCase().split(" ")[0]

    const fetchWeather = async () => {
      try {
        const res = await fetch(`/api/weather?borough=${borough}`);
        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error("Failed to fetch weather:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();

    const interval = setInterval(fetchWeather, 10 * 60 * 1000); // every 10 min
    return () => clearInterval(interval);
  }, [borough]);

  return { weather, loading };
}
