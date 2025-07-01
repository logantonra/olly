"use server";
import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { MessageInbox } from "@/components/library/messageInbox";
import { userHasDevice } from "@/lib/db/hasDevice";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }
  if (!(await userHasDevice())) {
    redirect("/devices/notauthorized");
  }

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-400 to-blue-300 px-6 pt-[10rem] text-white">
        <div className="relative z-10 flex w-full max-w-xl flex-col items-center rounded-3xl bg-white/20 px-6 py-10 text-center shadow-xl backdrop-blur-md sm:px-10 md:px-12">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Manage Inbox
          </h2>
          <MessageInbox />
        </div>
      </div>
    </>
  );
}
