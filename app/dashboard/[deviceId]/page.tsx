"use server";
import { WeatherBackground } from "@/components/dailydash/weatherBackground";
import { WeatherDisplay } from "@/components/dailydash/weatherDisplay";
import { SubwayDisplay } from "@/components/dailydash/subwayDisplay";
import { TimeDisplay } from "@/components/dailydash/timeDisplay";
import { MessagesDisplay } from "@/components/dailydash/messageDisplay";
import { deviceOwner } from "@/lib/auth/deviceAuth";
import { CloudRain } from "lucide-react";
import { House } from "lucide-react";
import Link from "next/link";

interface DailyDashProps {
  params: { deviceId: string };
  searchParams: { token: string };
}

export default async function DailyDash({
  params,
  searchParams,
}: DailyDashProps) {
  const deviceId = params.deviceId;
  const token = searchParams.token;
  const userEmail = await deviceOwner(deviceId, token);
  const authorized = userEmail !== "notfound" && userEmail !== "notauthorized";
  const errorMapping: Record<string, string> = {
    notfound: `Error: device with ID ${deviceId} not found`,
    notauthorized: `Error: you are unauthorized to access this page`,
  };
  return (
    <>
      {authorized && (
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
      )}
      {!authorized && (
        <div className="relative z-10 flex h-screen flex-col items-center justify-center text-white">
          {/* Logo */}
          <CloudRain className="mb-4 h-16 w-16 text-white" />

          {/* App Name */}
          <h1 className="mb-6 text-4xl font-semibold tracking-wide">
            {errorMapping[userEmail] || "Unauthorized Access"}
          </h1>
          <p className="text-lg text-gray-600">
            Please contact support with your device serial number
          </p>
          <Link href="/">
            <House className="mt-6 h-8 w-8 text-white hover:text-white/80" />
          </Link>
        </div>
      )}
    </>
  );
}
