export type WeatherTheme = "sunny" | "partly-cloudy" | "cloudy" | "light-rain" | "rain" | "snow" | "thunderstorm";
export type softWeatherInfo =  {theme: WeatherTheme; description: string }
export type forecast = {time: number, temperature: number, code: number}
export type fullWeatherData = {
    softInfo: softWeatherInfo,
    temperature: number,
    code: number,
    forecast: forecast[],
}