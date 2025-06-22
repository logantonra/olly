"use server";
import { WeatherBackground } from "@/components/dailydash/weatherBackground";
import { WeatherDisplay } from "@/components/dailydash/weatherDisplay";
import { SubwayDisplay } from "@/components/dailydash/subwayDisplay";
import { TimeDisplay } from "@/components/dailydash/timeDisplay";
import { MessagesDisplay } from "@/components/dailydash/messageDisplay";

export default async function DailyDash() {
  return (
    <>
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
    </>
  );
}
