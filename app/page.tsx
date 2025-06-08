"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Train, Cloud, MapPin, X, MessageCircle } from "lucide-react";

// Mock data - in real implementation, these would come from APIs
const mockSubwayData = {
  "Union Sq-14 St": {
    "4": [2, 7, 12, 18],
    "5": [4, 9, 15, 21],
    "6": [1, 6, 11, 16],
    L: [3, 8, 13, 19],
  },
  "Times Sq-42 St": {
    "1": [1, 5, 9, 14],
    "2": [3, 8, 13, 18],
    "3": [2, 7, 12, 17],
    "7": [4, 9, 14, 19],
  },
  "14 St-Union Sq": {
    "4": [2, 7, 12, 18],
    "5": [4, 9, 15, 21],
    "6": [1, 6, 11, 16],
    L: [3, 8, 13, 19],
  },
};

const mockWeatherData = {
  current: {
    temp: 72,
    condition: "partly-cloudy",
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

const subwayColors = {
  "1": "#EE352E",
  "2": "#EE352E",
  "3": "#EE352E",
  "4": "#00933C",
  "5": "#00933C",
  "6": "#00933C",
  "7": "#B933AD",
  L: "#A7A9AC",
  N: "#FCCC0A",
  Q: "#FCCC0A",
  R: "#FCCC0A",
  W: "#FCCC0A",
};

const weatherBackgrounds = {
  sunny: "bg-gradient-to-br from-amber-300 via-orange-300 to-yellow-400",
  "partly-cloudy": "bg-gradient-to-br from-blue-400 via-blue-300 to-cyan-300",
  cloudy: "bg-gradient-to-br from-gray-400 via-gray-300 to-slate-300",
  "light-rain": "bg-gradient-to-br from-slate-500 via-gray-400 to-blue-400",
  rain: "bg-gradient-to-br from-slate-600 via-gray-500 to-blue-500",
  snow: "bg-gradient-to-br from-slate-300 via-gray-200 to-blue-200",
  thunderstorm: "bg-gradient-to-br from-slate-700 via-gray-600 to-purple-600",
};

export default function NYCGiftDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "Mom",
      text: "Hope you have a wonderful day, sweetheart! 💕",
      read: false,
    },
    {
      id: 2,
      from: "Sarah",
      text: "Coffee later? That new place in Brooklyn looks amazing!",
      read: false,
    },
    {
      id: 3,
      from: "Your Love",
      text: "Made this just for you ❤️ You make every day brighter!",
      read: false,
    },
  ]);
  const [stations, setStations] = useState([
    "Union Sq-14 St",
    "Times Sq-42 St",
  ]);
  const [location, setLocation] = useState("New York, NY");

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Cycle through messages every 8 seconds
  useEffect(() => {
    const unreadMessages = messages.filter((m) => !m.read);
    if (unreadMessages.length === 0) return;

    const timer = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % unreadMessages.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const getNextDepartures = (station: string) => {
    const stationData =
      mockSubwayData[station as keyof typeof mockSubwayData] || {};
    const departures = [];

    for (const [line, times] of Object.entries(stationData)) {
      const nextTime = times[0];
      departures.push({ line, time: nextTime });
    }

    return departures.sort((a, b) => a.time - b.time).slice(0, 4);
  };

  const markMessageAsRead = (messageId: number) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, read: true } : msg)),
    );
  };

  const unreadMessages = messages.filter((m) => !m.read);
  const currentMessage = unreadMessages[currentMessageIndex];
  const currentWeather = mockWeatherData.current;
  const backgroundClass =
    weatherBackgrounds[
      currentWeather.condition as keyof typeof weatherBackgrounds
    ];

  return (
    <div className={`min-h-screen ${backgroundClass} relative overflow-hidden`}>
      {/* Animated Weather Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {currentWeather.condition === "sunny" && (
          <div className="absolute right-20 top-10 h-32 w-32 animate-pulse rounded-full bg-yellow-200 opacity-30"></div>
        )}
        {currentWeather.condition === "partly-cloudy" && (
          <>
            <div className="animate-float absolute left-1/4 top-8 h-16 w-24 rounded-full bg-white opacity-40"></div>
            <div className="animate-float-delayed absolute right-1/3 top-16 h-20 w-32 rounded-full bg-white opacity-30"></div>
          </>
        )}
        {currentWeather.condition === "light-rain" && (
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
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
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-screen items-center px-8">
        <div className="mx-auto flex w-full max-w-[1900px] items-center justify-between gap-8">
          {/* Time & Date Section */}
          <div className="flex-shrink-0">
            <div className="text-white/90">
              <div className="mb-1 text-5xl font-light">
                {formatTime(currentTime)}
              </div>
              <div className="text-lg font-light opacity-80">
                {formatDate(currentTime)}
              </div>
            </div>
          </div>

          {/* Subway Section */}
          <div className="flex-shrink-0">
            <Card className="border-white/20 bg-white/10 text-white backdrop-blur-md">
              <CardContent className="min-w-[280px] p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Train className="h-5 w-5" />
                    <h2 className="text-lg font-medium">Next Trains</h2>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                      >
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Change Stations</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Station 1</Label>
                          <Select
                            value={stations[0]}
                            onValueChange={(value) =>
                              setStations((prev) => [value, prev[1]])
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(mockSubwayData).map((station) => (
                                <SelectItem key={station} value={station}>
                                  {station}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Station 2</Label>
                          <Select
                            value={stations[1]}
                            onValueChange={(value) =>
                              setStations((prev) => [prev[0], value])
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.keys(mockSubwayData).map((station) => (
                                <SelectItem key={station} value={station}>
                                  {station}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-4">
                  {stations.map((station, idx) => (
                    <div key={station}>
                      <h3 className="mb-2 text-sm font-medium opacity-90">
                        {station.replace("-", " - ")}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {getNextDepartures(station).map((departure, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <Badge
                              style={{
                                backgroundColor:
                                  subwayColors[
                                    departure.line as keyof typeof subwayColors
                                  ],
                              }}
                              className="px-2 py-1 text-xs font-medium text-white"
                            >
                              {departure.line}
                            </Badge>
                            <span className="text-sm opacity-90">
                              {departure.time}m
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weather Section - Center & Prominent */}
          <div className="flex-1 text-center">
            <div className="text-white">
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

          {/* Messages Section */}
          <div className="flex-shrink-0">
            <Card className="border-white/20 bg-white/10 text-white backdrop-blur-md">
              <CardContent className="h-[200px] min-w-[300px] p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    <h2 className="text-lg font-medium">Messages</h2>
                  </div>
                  {unreadMessages.length > 0 && (
                    <Badge className="bg-pink-500 text-xs text-white">
                      {unreadMessages.length}
                    </Badge>
                  )}
                </div>

                {currentMessage ? (
                  <div className="flex h-32 flex-col justify-center">
                    <div className="space-y-3">
                      <div className="text-sm font-medium opacity-90">
                        From: {currentMessage.from}
                      </div>
                      <div className="text-sm leading-relaxed opacity-95">
                        {currentMessage.text}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => markMessageAsRead(currentMessage.id)}
                        className="mt-2 self-start text-white hover:bg-white/20"
                      >
                        <X className="mr-1 h-3 w-3" />
                        Mark Read
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-32 items-center justify-center text-sm opacity-60">
                    All caught up! ✨
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
