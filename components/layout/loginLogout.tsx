"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth, logout } from "@/app/actions";

export function LoginLogout() {
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

  const handleLogout = async () => {
    try {
      await logout();
      setSubject(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <>
      {subject !== null && (
        <Button
          className="absolute right-4 top-4 z-50 border-white px-6 py-2 text-white hover:bg-white hover:text-black"
          variant="outline"
          onClick={handleLogout}
        >
          <User className="h-4 w-4" />
          {"Sign Out"}
        </Button>
      )}
    </>
  );
}
