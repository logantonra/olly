"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Cloud } from "lucide-react";

// sunny: "bg-gradient-to-br from-blue-400 via-blue-300 to-yellow-300",
// "partly-cloudy": "bg-gradient-to-br from-blue-400 via-blue-300 to-cyan-300",
// cloudy: "bg-gradient-to-br from-gray-300 via-slate-300 to-blue-200",
// "light-rain": "bg-gradient-to-br from-slate-500 via-gray-400 to-blue-400",
// rain: "bg-gradient-to-br from-slate-600 via-gray-500 to-blue-500",
// snow: "bg-gradient-to-br from-slate-200 via-gray-100 to-blue-100",
// thunderstorm: "bg-gradient-to-br from-slate-800 via-gray-700 to-purple-700",

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
  const [location, setLocation] = useState("New York, NY");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tempLocation, setTempLocation] = useState(location);

  const currentWeather = mockWeatherData.current;

  const handleSaveLocation = () => {
    setLocation(tempLocation);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex-1 text-center">
      <div className="text-white">
        <div className="mb-2 flex items-center justify-center gap-2">
          <span className="text-lg font-light opacity-80">{location}</span>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="p-1 text-white hover:bg-white/20"
              >
                <MapPin className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change Location</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Location</Label>
                  <Input
                    value={tempLocation}
                    onChange={(e) => setTempLocation(e.target.value)}
                    placeholder="Enter city, state"
                  />
                </div>
                <Button onClick={handleSaveLocation} className="w-full">
                  Save Location
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-4 flex items-center justify-center gap-4">
          <currentWeather.icon className="h-16 w-16" />
          <div className="text-7xl font-thin">{currentWeather.temp}°</div>
        </div>
        <div className="mb-6 text-xl font-light opacity-90">
          {currentWeather.description}
        </div>

        {/* Hourly Forecast */}
        <div className="flex justify-center gap-6">
          {mockWeatherData.hourly.slice(0, 5).map((hour, i) => (
            <div key={i} className="text-center">
              <div className="mb-1 text-sm opacity-80">{hour.time}</div>
              <div className="text-lg font-medium">{hour.temp}°</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { mockWeatherData };
