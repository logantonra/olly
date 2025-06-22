"use server";
import React from "react";
import { LoggedIn } from "@/lib/auth/types";
import { auth } from "@/auth";
import { RedirectButton } from "@/components/shared/redirectButton";
import { PlusCircle, Settings, Inbox } from "lucide-react";

export default async function Home() {
  const session = (await auth()) as LoggedIn | null;

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-400 to-blue-300 px-6 text-white">
        <div className="relative z-10 flex w-full max-w-3xl flex-col items-center rounded-3xl bg-white/20 px-6 py-10 shadow-xl backdrop-blur-md sm:px-10 md:px-12">
          {/* Button Container */}
          <div className="flex w-full flex-col gap-6 md:flex-row">
            <RedirectButton
              label="Manage message inbox"
              page="/devices/inbox"
              icon={<Inbox className="mr-2 h-5 w-5" />}
            />

            <RedirectButton
              label="Device Settings"
              page="/devices/settings"
              icon={<Settings className="mr-2 h-5 w-5" />}
            />
            <RedirectButton
              label="Register New Device"
              page="devices/register"
              icon={<PlusCircle className="mr-2 h-5 w-5" />}
            />
          </div>
        </div>
      </div>
    </>
  );
}
