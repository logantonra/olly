"use client";

import { Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { signInWithGoogle } from "@/lib/auth/signIn";

export function SplashPage() {
  const [subject, setSubject] = useState<string | null>(null);

  return (
    <div className="relative z-10 flex h-screen flex-col items-center justify-center text-white">
      {/* Logo */}
      <Cloud className="mb-4 h-16 w-16 text-white" />

      {/* App Name */}
      <h1 className="mb-6 text-4xl font-semibold tracking-wide">Olly</h1>

      {/* Login Button */}
      {subject === null && (
        <div className="flex gap-4">
          <form action={signInWithGoogle}>
            <Button
              variant="outline"
              className="border-white px-6 py-2 text-white hover:bg-white hover:text-black"
            >
              Sign In / Sign Up
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
