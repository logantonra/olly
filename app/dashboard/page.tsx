"use server";
import { WeatherBackground } from "@/components/dailydash/weatherBackground";
import { WeatherDisplay } from "@/components/dailydash/weatherDisplay";
import { SubwayDisplay } from "@/components/dailydash/subwayDisplay";
import { TimeDisplay } from "@/components/dailydash/timeDisplay";
import { MessagesDisplay } from "@/components/dailydash/messageDisplay";
import { getUserEmail } from "@/lib/auth/getSession";

interface DailyDashProps {
  params: { deviceId: string };
  searchParams: { token: string };
}

export default async function DailyDash({
  params,
  searchParams,
}: DailyDashProps) {
  const userEmail = await getUserEmail();
  if (!userEmail) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        <h1 className="text-2xl">Unauthorized Access</h1>
      </div>
    );
  }
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
