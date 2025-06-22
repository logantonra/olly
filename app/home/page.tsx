"use server";
import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { RedirectButton } from "@/components/shared/redirectButton";
import { Send, Settings } from "lucide-react";

export default async function Home() {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-400 to-blue-300 px-6 text-white">
        <div className="relative z-10 flex w-full max-w-3xl flex-col items-center rounded-3xl bg-white/20 px-6 py-10 shadow-xl backdrop-blur-md sm:px-10 md:px-12">
          <h1 className="mb-10 text-center text-4xl font-bold text-white">
            Welcome back, {session.user?.name?.split(" ")[0] || "User"} ☁️
          </h1>

          {/* Button Container */}
          <div className="flex w-full flex-col gap-6 md:flex-row">
            <RedirectButton
              label="Send a message"
              page="/message"
              icon={<Send className="mr-2 h-5 w-5" />}
            ></RedirectButton>

            <RedirectButton
              label="Manage My Ollys"
              page="/devices"
              icon={<Settings className="mr-2 h-5 w-5" />}
            ></RedirectButton>
          </div>
        </div>
      </div>
    </>
  );
}
