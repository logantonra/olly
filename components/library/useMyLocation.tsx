"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import type { Location } from "@/lib/db/types";
import { CheckCircle } from "lucide-react";

type Status = "idle" | "waiting" | "ready" | "saving" | "saved" | "err";

export default function UseMyLocation({
  initial,
}: {
  initial: { city: string };
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [nickname, setNickname] = useState(initial.city || "Current location");
  const [toast, setToast] = useState<string | null>(null);

  const saveLocation = async (loc: Location) => {
    const res = await fetch("/api/settings/location", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loc),
    });
    if (!res.ok) {
      console.error(await res.text());
      setToast("❌ Could not save");
      return;
    }
    setToast("Saved successfully");
  };

  /* step 1: ask browser for location */
  const getLocation = () => {
    if (!navigator.geolocation) return setStatus("err");

    setStatus("waiting");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setCoords({ lat: coords.latitude, lon: coords.longitude });
        setStatus("ready");
      },
      () => {
        setStatus("err");
        setToast("could not get location, check browser settings");
      },
      { enableHighAccuracy: true, timeout: 10_000 },
    );
  };

  /* step 2: save nickname + coords */
  const save = async () => {
    if (!coords) return;
    setStatus("saving");

    await saveLocation({
      city: nickname,
      lat: coords.lat.toString(),
      long: coords.lon.toString(),
    });

    console.log("Location saved:", {
      city: nickname,
      lat: coords.lat.toString(),
      lon: coords.lon.toString(),
    });
    setStatus("saved");
  };

  return (
    <div className="space-y-4">
      {/* primary button */}
      {(status === "idle" || status === "waiting") && (
        <Button
          onClick={getLocation}
          disabled={status === "waiting"}
          variant="secondary" // ← filled pill
          className="mx-auto flex items-center gap-2 px-6 shadow-md
             ring-1 ring-white/30 hover:brightness-110
             disabled:cursor-not-allowed disabled:opacity-60"
        >
          <MapPin className="h-4 w-4 shrink-0" />
          {status === "waiting" ? "Locating…" : "Use my current location"}
        </Button>
      )}

      {/* nickname & save */}
      {status === "ready" && coords && (
        <div className="space-y-3">
          <label className="block text-sm">
            Nickname for this place
            <input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="mt-1 w-full rounded-md p-2 text-black"
            />
          </label>
          <p className="text-xs opacity-80">
            Coordinates: {coords.lat.toFixed(4)}, {coords.lon.toFixed(4)}
          </p>
          <Button
            onClick={save}
            disabled={status === "saving"}
            className="w-full"
          >
            {status === "saving" ? "Saving…" : "Save location"}
          </Button>
        </div>
      )}

      {toast && (
        <div
          role="status"
          className="mx-auto mt-6 flex max-w-xs items-center gap-2 rounded-lg
               bg-white/25 px-4 py-2 text-sm font-medium text-white/90
               shadow backdrop-blur-md"
        >
          <CheckCircle className="h-4 w-4 flex-none text-green-300" />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
