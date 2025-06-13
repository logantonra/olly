"use client";

import { Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { auth, login } from "@/app/actions";

export function SplashPage() {
  const [subject, setSubject] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const result = await auth();
        setSubject(result || null);
      } catch (error) {
        console.error("Error during authentication:", error);
      }
    };

    fetchAuth();
  }, []);

  const handleLogin = async () => {
    try {
      await login(); // Call the async login function
      const result = await auth(); // Re-fetch the auth state after login
      setSubject(result || null);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  console.log("Subject:", subject);

  return (
    <div className="relative z-10 flex h-screen flex-col items-center justify-center text-white">
      {/* Logo */}
      <Cloud className="mb-4 h-16 w-16 text-white" />

      {/* App Name */}
      <h1 className="mb-6 text-4xl font-semibold tracking-wide">Olly</h1>

      {/* Login Button */}
      {subject === null && (
        <div className="flex gap-4">
          <Button
            onClick={handleLogin}
            variant="outline"
            className="border-white px-6 py-2 text-white hover:bg-white hover:text-black"
          >
            Sign In / Sign Up
          </Button>
        </div>
      )}
    </div>
  );
}
