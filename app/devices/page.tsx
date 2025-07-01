"use server";
import React from "react";
import { RedirectButton } from "@/components/shared/redirectButton";
import { PlusCircle, Settings, Inbox } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-400 to-blue-300 px-6 text-white">
        <div className="relative z-10 flex w-full max-w-3xl flex-col items-center rounded-3xl bg-white/20 px-6 py-10 shadow-xl backdrop-blur-md sm:px-10 md:px-12">
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

        {/* Small Link */}
        <div className="z-10 mt-4 text-sm text-white/80 transition hover:text-white">
          <Link href="/dashboard"> Go to my dashboard</Link>
        </div>
      </div>
    </>
  );
}
