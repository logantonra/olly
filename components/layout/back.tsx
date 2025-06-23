"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

export function BackButton({
  fallback = "/",
  className = "",
}: {
  fallback?: string;
  className?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const hiddenPaths = ["/", "/dashboard", "/home"];
  if (hiddenPaths.includes(pathname)) return null;

  const fromSameOrigin = () => {
    if (typeof document === "undefined") return false;
    return document.referrer.startsWith(window.location.origin);
  };

  const handleClick = () => {
    if (fromSameOrigin() && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <Button
      aria-label="Go back"
      variant="outline"
      type="button"
      onClick={handleClick}
      className={clsx(
        "absolute left-4 top-4 z-50 flex items-center gap-1.5 border-white px-6 py-2 text-white hover:bg-white hover:text-black focus-visible:outline-2",
        className,
      )}
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </Button>
  );
}
