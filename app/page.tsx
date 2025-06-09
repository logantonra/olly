"use client";
import { WeatherBackground } from "@/components/mainpage/weatherBackground";
import { WeatherDisplay } from "@/components/mainpage/weatherDisplay";
import { SubwayDisplay } from "@/components/mainpage/subwayDisplay";
import { TimeDisplay } from "@/components/mainpage/timeDisplay";
import { MessagesDisplay } from "@/components/mainpage/messageDisplay";

export default function DailyDash() {
  return (
    <>
      <WeatherBackground />
      <div className="relative z-10 flex h-screen items-center px-8">
        <div className="mx-auto flex w-full max-w-[1900px] items-center justify-between gap-8">
          <TimeDisplay />
          <SubwayDisplay />
          <WeatherDisplay />
          <MessagesDisplay />
        </div>
      </div>
    </>
  );
}
