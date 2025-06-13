"use client";

import { Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SplashPage({
  onSignUp,
  onSignIn,
}: {
  onSignUp: () => void;
  onSignIn: () => void;
}) {
  return (
    <div className="relative z-10 flex h-screen flex-col items-center justify-center text-white">
      {/* Logo */}
      <Cloud className="mb-4 h-16 w-16 text-white" />

      {/* App Name */}
      <h1 className="mb-6 text-4xl font-semibold tracking-wide">Olly</h1>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button onClick={onSignUp} variant="secondary" className="px-6 py-2">
          Sign Up
        </Button>
        <Button
          onClick={onSignIn}
          variant="outline"
          className="border-white px-6 py-2 text-white hover:bg-white hover:text-black"
        >
          Sign In
        </Button>
      </div>
    </div>
  );
}
