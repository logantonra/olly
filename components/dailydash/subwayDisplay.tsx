"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Train } from "lucide-react";
import { SUBWAY_COLORS } from "@/lib/trains/trainConfig";
import { StationSelector } from "@/components/dailydash/sub_components/stationSelector";
import { Station, StationSelectorProps } from "@/lib/trains/utils/types";

interface StationConfig {
  name: string;
  id: string;
  direction: "Northbound" | "Southbound";
}

export function SubwayDisplay({ email }: { email: string }) {
  const [selectedStations, setSelectedStations] = useState<Station[]>([
    { name: "Union Sq-14 St", id: "L03", direction: "Northbound" },
    { name: "Grand Central-42 St", id: "631", direction: "Southbound" },
  ]);

  const [times, setTimes] = useState<{ line: string; time: number }[][]>([]);

  const fetchAllTimes = async () => {
    const allTimes = await Promise.all(
      selectedStations.map(async (station) => {
        const direction = station.direction.startsWith("N") ? "N" : "S";
        const res = await fetch(
          `/api/stop-times?stationId=${station.id}&direction=${direction}`,
        );
        const data = await res.json();
        return data.times || [];
      }),
    );
    setTimes(allTimes);
  };

  useEffect(() => {
    console.log("fetching updated times");
    fetchAllTimes();
    const interval = setInterval(fetchAllTimes, 45000); // every 45s
    return () => clearInterval(interval);
  }, [selectedStations]);

  return (
    <div className="flex-shrink-0">
      <Card className="border-white/20 bg-white/10 text-white backdrop-blur-md">
        <CardContent className="min-w-[320px] p-6">
          {/* <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Train className="h-5 w-5" />
              <h2 className="text-lg font-medium">Next Trains</h2>
            </div>
            <StationSelector
              selectedStations={selectedStations}
              setSelectedStations={setSelectedStations}
            />
          </div> */}

          <div className="space-y-4">
            {selectedStations.map((stationConfig, idx) => (
              <div key={`${stationConfig.name}-${stationConfig.direction}`}>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-medium opacity-90">
                    {stationConfig.name.replace("-", " - ")}
                  </h3>
                  <span className="text-xs capitalize opacity-70">
                    {stationConfig.direction.toLowerCase()}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(times[idx] || [])
                    .sort((a, b) => a.time - b.time)
                    .slice(0, 4)
                    .map((departure, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <Badge
                          style={{
                            backgroundColor:
                              SUBWAY_COLORS[
                                departure.line as keyof typeof SUBWAY_COLORS
                              ],
                          }}
                          className="flex h-6 w-6 items-center justify-center rounded-full p-0 text-xs font-medium text-white"
                        >
                          {departure.line}
                        </Badge>
                        <span className="text-sm opacity-90">
                          {Math.round(
                            (departure.time - Date.now() / 1000) / 60,
                          )}
                          m
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
