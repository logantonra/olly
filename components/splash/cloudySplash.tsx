"use client";
import { usePathname } from "next/navigation";

export function CloudySplash() {
  const backgroundClass =
    "bg-gradient-to-br from-blue-400 via-blue-300 to-cyan-300";

  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboards");
  if (isDashboard) {
    return null;
  }

  return (
    <div className={`fixed inset-0 ${backgroundClass}`}>
      {/* Animated Weather Elements */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Main Clouds */}
        <div className="animate-float absolute left-1/4 top-8 h-16 w-24 rounded-full bg-white opacity-40" />
        <div className="animate-float-delayed absolute right-1/3 top-16 h-20 w-32 rounded-full bg-white opacity-30" />
        <div className="animate-float-slow absolute left-1/2 top-20 h-24 w-28 rounded-full bg-white opacity-25" />

        {/* Extra Clouds */}
        <div className="animate-float absolute left-10 top-10 h-12 w-20 rounded-full bg-white opacity-30" />
        <div className="animate-float-delayed opacity-35 absolute right-10 top-24 h-14 w-24 rounded-full bg-white" />
        <div className="animate-float-slow w-26 absolute left-1/3 top-40 h-16 rounded-full bg-white opacity-20" />
        <div className="animate-float h-18 w-30 opacity-28 absolute right-1/4 top-32 rounded-full bg-white" />
        <div className="animate-float-delayed absolute bottom-16 left-16 h-16 w-28 rounded-full bg-white opacity-25" />
        <div className="animate-float-slow absolute bottom-10 right-20 h-20 w-32 rounded-full bg-white opacity-30" />
        <div className="animate-float left-1/6 absolute bottom-20 h-14 w-24 rounded-full bg-white opacity-30" />
      </div>
    </div>
  );
}
