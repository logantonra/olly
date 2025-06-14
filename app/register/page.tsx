import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { House } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-400 to-blue-300 text-white">
        <div className="relative z-10 flex w-full max-w-xl flex-col items-center rounded-3xl bg-white/20 px-6 py-10 text-center shadow-xl backdrop-blur-md sm:px-10 md:px-12">
          <h2 className="mb-4 text-2xl font-semibold text-white">
            Coming Soon
          </h2>
          <p className="text-lg text-white/90">
            Register a device functionality is coming soon. Stay tuned! In the
            meantime, let Logan know if you want an Olly device 📺
          </p>
          <Link href="/">
            <House className="mt-6 h-8 w-8 text-white hover:text-white/80" />
          </Link>
        </div>
      </div>
    </>
  );
}
