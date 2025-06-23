"use client";

import { CheckCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { STOPS_BY_LINE, SUBWAY_COLORS } from "@/lib/trains/trainConfig";
import type { Station, StationSelectorProps } from "@/lib/trains/utils/types";

export function StationSelector({ selectedStations }: StationSelectorProps) {
  const [box, setBox] = useState<number | null>(null);
  const [line, setLine] = useState<string | null>(null);
  const [temp, setTemp] = useState<Station | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const lineGroups = useMemo(() => {
    const g: Record<string, string[]> = {};
    Object.keys(STOPS_BY_LINE).forEach((ln) => {
      const c = SUBWAY_COLORS[ln as keyof typeof SUBWAY_COLORS];
      (g[c] ??= []).push(ln);
    });
    return Object.entries(g);
  }, []);

  const saveStations = async (arr: [Station, Station]) => {
    if (arr.length !== 2) return;

    const res = await fetch("/api/settings/stations", {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stations: arr }),
    });
    if (!res.ok) {
      console.error(await res.text());
      setToast("❌ Could not save");
      return;
    }
    setToast("Saved successfully");
    selectedStations.splice(0, selectedStations.length, ...arr);
  };

  const saveDir = (direction: "Northbound" | "Southbound") => {
    if (box === null || !temp) return;
    const arr: [Station, Station] = [...selectedStations] as [Station, Station];
    arr[box] = { ...temp, direction };
    saveStations(arr);
    setBox(null);
    setLine(null);
    setTemp(null);
    setTimeout(() => setToast(null), 5_000);
  };

  return (
    <div className="space-y-8 text-white">
      {/* 1 ▸ Station boxes */}
      <div className="grid grid-cols-2 gap-4">
        {selectedStations.map((s, i) => {
          const active = box === i;
          const hasVal = !!s.name;
          return (
            <div
              key={i}
              onClick={() => {
                setBox(i);
                setLine(null);
                setTemp(null);
              }}
              className={`cursor-pointer rounded-lg border p-4 transition ${
                active
                  ? "border-white bg-white text-slate-900"
                  : hasVal
                  ? "border-white/40 bg-white/10 hover:bg-white/20"
                  : "border-white/40 hover:bg-white/10"
              }`}
            >
              <div className="mb-1 text-sm font-semibold">
                Station {i + 1}: {s.name || "Not selected"}
              </div>
              <div
                className={`text-xs ${
                  active ? "text-slate-600" : "text-white/70"
                }`}
              >
                {s.direction || "Tap to choose"}
              </div>
            </div>
          );
        })}
      </div>

      {/* 2 ▸ Pick a line */}
      {box !== null && !line && !temp && (
        <section>
          <h3 className="mb-3 text-sm font-medium">Select a train line</h3>
          {lineGroups.map(([color, lines]) => (
            <div key={color} className="mb-2 flex flex-wrap gap-2">
              {lines.map((ln) => (
                <Badge
                  key={ln}
                  onClick={() => setLine(ln)}
                  style={{ backgroundColor: color }}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-0 text-xs font-medium text-white hover:opacity-80"
                >
                  {ln}
                </Badge>
              ))}
            </div>
          ))}
        </section>
      )}

      {/* 3 ▸ Pick a stop */}
      {line && !temp && (
        <section>
          <h3 className="mb-3 text-sm font-medium">
            Select a station on the {line} line (ordered alphabetically)
          </h3>
          <div className="max-h-48 overflow-y-auto rounded-md border border-white/30 bg-white/5 p-3">
            {STOPS_BY_LINE[line as keyof typeof STOPS_BY_LINE].map((stop) => (
              <div
                key={stop.id}
                onClick={() =>
                  setTemp({
                    id: stop.id,
                    name: stop.name,
                    direction: "Northbound",
                  })
                }
                className="cursor-pointer rounded px-3 py-2 text-sm hover:bg-white/10"
              >
                {stop.name}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4 ▸ Pick direction */}
      {temp && (
        <section>
          <h3 className="mb-3 text-sm font-medium">Select direction</h3>
          <div className="flex gap-4">
            <Button onClick={() => saveDir("Northbound")}>Northbound</Button>
            <Button onClick={() => saveDir("Southbound")}>Southbound</Button>
          </div>
        </section>
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
