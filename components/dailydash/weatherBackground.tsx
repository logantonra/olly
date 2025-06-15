"use client";

type WeatherCondition =
  | "sunny"
  | "partly-cloudy"
  | "cloudy"
  | "light-rain"
  | "rain"
  | "snow"
  | "thunderstorm";

const weatherBackgrounds = {
  sunny: "bg-gradient-to-br from-blue-400 via-blue-300 to-yellow-300",
  "partly-cloudy": "bg-gradient-to-br from-blue-400 via-blue-300 to-cyan-300",
  cloudy: "bg-gradient-to-br from-gray-300 via-slate-300 to-blue-200",
  "light-rain": "bg-gradient-to-br from-slate-500 via-gray-400 to-blue-400",
  rain: "bg-gradient-to-br from-slate-600 via-gray-500 to-blue-500",
  snow: "bg-gradient-to-br from-blue-200 via-blue-300 to-sky-500",
  thunderstorm: "bg-gradient-to-br from-slate-800 via-gray-700 to-purple-700",
};

export function WeatherBackground({ email }: { email: string }) {
  // TODO: make this dynamic based on the live weather feed
  const currentWeather: { condition: WeatherCondition } = {
    condition: "partly-cloudy",
  };
  const backgroundClass = weatherBackgrounds[currentWeather.condition];

  return (
    <div className={`fixed inset-0 ${backgroundClass}`}>
      {/* Animated Weather Elements */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Sunny Weather */}
        {currentWeather.condition === "sunny" && (
          <>
            <div className="absolute right-32 top-16 h-24 w-24 animate-pulse rounded-full bg-yellow-300 opacity-80"></div>
            <div className="absolute right-20 top-8 h-32 w-32 animate-pulse rounded-full bg-yellow-200 opacity-40"></div>
            {/* Subtle clouds */}
            <div className="animate-float absolute left-1/4 top-12 h-12 w-20 rounded-full bg-white opacity-20"></div>
          </>
        )}

        {/* Partly Cloudy Weather */}
        {currentWeather.condition === "partly-cloudy" && (
          <>
            <div className="animate-float absolute left-1/4 top-8 h-16 w-24 rounded-full bg-white opacity-40"></div>
            <div className="animate-float-delayed absolute right-1/3 top-16 h-20 w-32 rounded-full bg-white opacity-30"></div>
            <div className="h-18 animate-float-slow absolute left-1/2 top-20 w-28 rounded-full bg-white opacity-25"></div>
          </>
        )}

        {/* Cloudy Weather */}
        {currentWeather.condition === "cloudy" && (
          <>
            <div className="left-1/6 animate-float absolute top-4 h-20 w-32 rounded-full bg-white opacity-60"></div>
            <div className="animate-float-delayed absolute right-1/4 top-12 h-24 w-40 rounded-full bg-white opacity-50"></div>
            <div className="h-22 opacity-45 animate-float-slow absolute left-1/2 top-8 w-36 rounded-full bg-white"></div>
            <div className="h-18 animate-float absolute left-3/4 top-16 w-28 rounded-full bg-white opacity-40"></div>
          </>
        )}

        {/* Light Rain */}
        {currentWeather.condition === "light-rain" && (
          <>
            <div className="absolute inset-0">
              {[...Array(25)].map((_, i) => (
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

        {/* Light Rain TODO: make it not jump around on re render */}
        {currentWeather.condition === "rain" && (
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

        {/* Snow TODO: make the snow animation work*/}
        {currentWeather.condition === "snow" && (
          <>
            <div className="absolute inset-0">
              {[...Array(40)].map((_, i) => (
                <div
                  key={i}
                  className="animate-snow absolute h-2 w-2 rounded-full bg-white opacity-80"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${3 + Math.random() * 2}s`,
                  }}
                ></div>
              ))}
            </div>
            <div className="animate-float absolute left-1/4 top-8 h-20 w-32 rounded-full bg-gray-200 opacity-60"></div>
            <div className="h-18 animate-float-delayed absolute right-1/4 top-12 w-28 rounded-full bg-gray-300 opacity-50"></div>
          </>
        )}

        {/* Thunderstorm TODO fix the thunderstorm animation */}
        {currentWeather.condition === "thunderstorm" && (
          <>
            <div className="left-1/5 animate-float absolute top-4 h-24 w-40 rounded-full bg-gray-800 opacity-70"></div>
            <div className="h-22 animate-float-delayed absolute right-1/4 top-8 w-36 rounded-full bg-gray-700 opacity-60"></div>
            <div className="animate-float-slow absolute left-1/2 top-12 h-20 w-32 rounded-full bg-gray-900 opacity-50"></div>
            {/* Lightning flashes */}
            <div className="animate-lightning absolute inset-0 bg-white opacity-0"></div>
            {/* Heavy rain */}
            <div className="absolute inset-0">
              {[...Array(50)].map((_, i) => (
                <div
                  key={i}
                  className="animate-heavy-rain absolute h-12 w-1 bg-blue-300 opacity-70"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 1}s`,
                    animationDuration: `${0.5 + Math.random() * 0.5}s`,
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
