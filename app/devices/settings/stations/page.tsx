"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserSettings } from "@/lib/db/userPrefs";
import { StationSelector } from "@/components/stationSelector";

export default async function StationsSettings() {
  const session = await auth();
  if (!session) redirect("/");

  const settings = await getUserSettings(session.user.email);
  console.log("settings in stations settings:", settings);
  const current = settings?.stations ?? [];

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-400 to-blue-300 text-white">
      <div className="relative z-10 w-full max-w-xl rounded-3xl bg-white/20 px-6 py-10 shadow-xl backdrop-blur-md sm:px-10 md:px-12">
        <h2 className="mb-6 text-center text-3xl font-semibold">
          Select two stations:
        </h2>

        <StationSelector selectedStations={current} />
      </div>
    </div>
  );
}
