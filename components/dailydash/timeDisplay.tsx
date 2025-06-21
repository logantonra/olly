"use client";

import { useState, useEffect } from "react";

export function TimeDisplay({ email }: { email: string }) {
  // TODO: Use email to fetch user-specific time settings if needed
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 5000);
    return () => clearInterval(timer);
  }, []);

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

  return (
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
  );
}
