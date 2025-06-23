"use server";

import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { House } from "lucide-react";
import UseMyLocation from "@/components/library/useMyLocation";
import { getUserSettings } from "@/lib/db/userPrefs";
import { LoggedIn } from "@/lib/auth/types";

export default async function LocationSettings() {
  const session = (await auth()) as LoggedIn | null;
  if (!session) redirect("/");

  const { location = { city: "" } } =
    (await getUserSettings(session.user.email)) ?? {};

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-400 to-blue-300 px-6 text-white">
      <div className="relative z-10 flex w-full max-w-xl flex-col items-center rounded-3xl bg-white/20 px-6 py-10 text-center shadow-xl backdrop-blur-md sm:px-10 md:px-12">
        <h2 className="mb-6 text-3xl font-semibold">Set your location</h2>

        <UseMyLocation initial={location} />

        <p className="mt-6 max-w-xs text-sm opacity-90">
          We’ll use this spot for weather, time zone, and anything else that’s
          location-aware.
        </p>

        <Link href="/">
          <House className="mt-8 h-8 w-8 text-white hover:text-white/80" />
        </Link>
      </div>
    </div>
  );
}
