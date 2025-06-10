import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  Droplets,
  CloudRain,
  CloudSnow,
  Snowflake,
  CloudDrizzle,
  CloudLightning,
  CloudHail,
} from "lucide-react";
import {
  Building,
  Landmark,
  TreeDeciduous,
  Castle,
  TentTree,
} from "lucide-react";
import { softWeatherInfo } from "@/lib/weather/utils/types"

export const BOROUGH_COORDS: Record<string, { lat: number; lon: number }> = {
    manhattan: { lat: 40.7831, lon: -73.9712 },
    brooklyn: { lat: 40.6782, lon: -73.9442 },
    queens: { lat: 40.7282, lon: -73.7949 },
    bronx: { lat: 40.8448, lon: -73.8648 },
    staten: { lat: 40.5795, lon: -74.1502 },
  };
  
export const WEATHER_CODE_MAP: Record<number, softWeatherInfo> = {
  0: { theme: "sunny", description: "Clear sky", icon: Sun },
  1: { theme: "partly-cloudy", description: "Mainly clear", icon: CloudSun },
  2: { theme: "partly-cloudy", description: "Partly cloudy", icon: CloudSun },
  3: { theme: "cloudy", description: "Overcast", icon: Cloud },
  45: { theme: "cloudy", description: "Foggy", icon: CloudFog },
  48: { theme: "cloudy", description: "Depositing rime fog", icon: CloudFog },
  51: { theme: "light-rain", description: "Light drizzle", icon: CloudDrizzle },
  53: { theme: "light-rain", description: "Moderate drizzle", icon: CloudDrizzle },
  55: { theme: "light-rain", description: "Dense drizzle", icon: CloudDrizzle },
  61: { theme: "rain", description: "Light rain", icon: CloudRain },
  63: { theme: "rain", description: "Moderate rain", icon: CloudRain },
  65: { theme: "rain", description: "Heavy rain", icon: CloudRain },
  66: { theme: "snow", description: "Freezing rain", icon: CloudSnow },
  67: { theme: "snow", description: "Heavy freezing rain", icon: CloudSnow },
  71: { theme: "snow", description: "Slight snow", icon: Snowflake },
  73: { theme: "snow", description: "Moderate snow", icon: Snowflake },
  75: { theme: "snow", description: "Heavy snow", icon: CloudSnow },
  77: { theme: "snow", description: "Snow grains", icon: CloudSnow },
  80: { theme: "light-rain", description: "Slight rain showers", icon: Droplets },
  81: { theme: "rain", description: "Moderate rain showers", icon: CloudRain },
  82: { theme: "rain", description: "Violent rain showers", icon: CloudRain },
  95: { theme: "thunderstorm", description: "Thunderstorm", icon: CloudLightning },
  96: { theme: "thunderstorm", description: "Thunderstorm with hail", icon: CloudHail },
  99: { theme: "thunderstorm", description: "Severe thunderstorm", icon: CloudLightning },
  };

export const BOROUGH_OPTIONS = [
    {
      name: "Manhattan",
      value: "manhattan",
      icon: Building,
      color: "bg-yellow-500",
    },
    {
      name: "Brooklyn",
      value: "brooklyn",
      icon: Landmark,
      color: "bg-red-500",
    },
    {
      name: "Queens",
      value: "queens",
      icon: TreeDeciduous,
      color: "bg-green-500",
    },
    {
      name: "Bronx",
      value: "bronx",
      icon: Castle,
      color: "bg-blue-500",
    },
    {
      name: "Staten Island",
      value: "staten",
      icon: TentTree,
      color: "bg-purple-500",
    },
  ];