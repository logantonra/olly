"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SUBWAY_COLORS } from "@/lib/trains/trainConfig";
import type { Station } from "@/lib/trains/utils/types";
import { cn } from "@/lib/utils";

interface TimesResponse {
  stations: Station[];
  times: { line: string; time: number }[][];
}

export function SubwayDisplay() {
  const [stations, setStations] = useState<Station[]>([]);
  const [times, setTimes] = useState<TimesResponse["times"]>([]);

  const fetchTimes = useCallback(async () => {
    try {
      const res = await fetch("/api/trains/times", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("failed");
      const data: TimesResponse = await res.json();
      setStations(data.stations);
      setTimes(data.times);
    } catch (err) {
      console.error("Could not load subway times:", err);
    }
  }, []);

  /* initial load + 45 s poll */
  useEffect(() => {
    fetchTimes();
    const id = setInterval(fetchTimes, 45_000);
    return () => clearInterval(id);
  }, [fetchTimes]);

  return (
    <div className="flex-shrink-0">
      <Card className="border-white/20 bg-white/10 text-white backdrop-blur-md">
        <CardContent className="min-w-[320px] p-6">
          <div className="space-y-4">
            {stations.map((station, idx) => (
              <div key={`${station.name}-${station.direction}`}>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-medium opacity-90">
                    {station.name.replace("-", " - ")}
                  </h3>
                  <span className="text-xs capitalize opacity-70">
                    {station.direction.toLowerCase()}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {times[idx] && times[idx].length > 0 ? (
                    times[idx]
                      .sort((a, b) => a.time - b.time)
                      .slice(0, 4)
                      .map((d, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <Badge
                            style={{
                              backgroundColor:
                                SUBWAY_COLORS[
                                  d.line as keyof typeof SUBWAY_COLORS
                                ],
                            }}
                            className="flex h-6 w-6 items-center justify-center rounded-full p-0 text-xs font-medium text-white"
                          >
                            {d.line}
                          </Badge>
                          <span className="text-sm opacity-90">
                            {Math.max(
                              0,
                              Math.round((d.time - Date.now() / 1000) / 60),
                            )}
                            m
                          </span>
                        </div>
                      ))
                  ) : (
                    <span className="text-xs opacity-60">
                      No upcoming departures found
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
