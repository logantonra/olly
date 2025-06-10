export type WeatherTheme = "sunny" | "partly-cloudy" | "cloudy" | "light-rain" | "rain" | "snow" | "thunderstorm";
export type softWeatherInfo =  {theme: WeatherTheme; description: string; icon: React.FC<{ className?: string }> }
export type forecast = {time: number, temperature: number, code: number}
export type fullWeatherData = {
    softInfo: softWeatherInfo,
    temperature: number,
    forecast: forecast[],
}