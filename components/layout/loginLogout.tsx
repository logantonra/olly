"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOutGoogle } from "@/lib/auth/signout";

export function LoginLogout({ signedin }: { signedin: boolean }) {
  const [subject, setSubject] = useState<string | null>(null);

  return (
    <>
      {signedin && (
        <form action={signOutGoogle}>
          <Button
            className="absolute right-4 top-4 z-50 border-white px-6 py-2 text-white hover:bg-white hover:text-black"
            variant="outline"
          >
            <User className="h-4 w-4" />
            {"Sign Out"}
          </Button>
        </form>
      )}
    </>
  );
}
