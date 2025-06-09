"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Train, MapPin } from "lucide-react";
import { SUBWAY_COLORS } from "@/lib/trains/trainConfig";
import { StationSelector } from "@/components/mainpage/sub_components/stationSelector";
import { Station, StationSelectorProps } from "@/lib/trains/utils/types";

const mockSubwayData = {
  "Union Sq-14 St": {
    northbound: {
      "4": [2, 7, 12, 18],
      "5": [4, 9, 15, 21],
      "6": [1, 6, 11, 16],
      L: [3, 8, 13, 19],
    },
    southbound: {
      "4": [3, 8, 13, 19],
      "5": [5, 10, 16, 22],
      "6": [2, 7, 12, 17],
      L: [4, 9, 14, 20],
    },
  },
  "Times Sq-42 St": {
    northbound: {
      "1": [1, 5, 9, 14],
      "2": [3, 8, 13, 18],
      "3": [2, 7, 12, 17],
      "7": [4, 9, 14, 19],
    },
    southbound: {
      "1": [2, 6, 10, 15],
      "2": [4, 9, 14, 19],
      "3": [3, 8, 13, 18],
      "7": [5, 10, 15, 20],
    },
  },
  "14 St-Union Sq": {
    northbound: {
      "4": [2, 7, 12, 18],
      "5": [4, 9, 15, 21],
      "6": [1, 6, 11, 16],
      L: [3, 8, 13, 19],
    },
    southbound: {
      "4": [3, 8, 13, 19],
      "5": [5, 10, 16, 22],
      "6": [2, 7, 12, 17],
      L: [4, 9, 14, 20],
    },
  },
  "Grand Central-42 St": {
    northbound: {
      "4": [1, 6, 11, 16],
      "5": [3, 8, 13, 18],
      "6": [2, 7, 12, 17],
      "7": [4, 9, 14, 19],
    },
    southbound: {
      "4": [2, 7, 12, 17],
      "5": [4, 9, 14, 19],
      "6": [3, 8, 13, 18],
      "7": [5, 10, 15, 20],
    },
  },
};

interface StationConfig {
  station: string;
  direction: "northbound" | "southbound";
}

export function SubwayDisplay() {
  const [stations, setStations] = useState<StationConfig[]>([
    { station: "Union Sq-14 St", direction: "northbound" },
    { station: "Times Sq-42 St", direction: "southbound" },
  ]);

  const [selectedStations, setSelectedStations] = useState<Station[]>([
    { name: "Union Sq-14 St", id: "L03", direction: "Northbound" },
    { name: "Grand Central-42 St", id: "631", direction: "Southbound" },
  ]);

  const getNextDepartures = (stationConfig: StationConfig) => {
    const stationData =
      mockSubwayData[stationConfig.station as keyof typeof mockSubwayData];
    if (!stationData) return [];

    const directionData = stationData[stationConfig.direction] || {};
    const departures = [];

    for (const [line, times] of Object.entries(directionData)) {
      const nextTime = times[0];
      departures.push({ line, time: nextTime });
    }

    return departures.sort((a, b) => a.time - b.time).slice(0, 4);
  };

  const updateStation = (
    index: number,
    field: keyof StationConfig,
    value: string,
  ) => {
    setStations((prev) =>
      prev.map((station, i) =>
        i === index ? { ...station, [field]: value } : station,
      ),
    );
  };

  const [times, setTimes] = useState<number[]>([]);

  const stationId = "L01";
  const direction = "S";
  useEffect(() => {
    const fetchTimes = async () => {
      const res = await fetch(
        `/api/stop-times?stationId=${stationId}&direction=${direction}`,
      );
      const data = await res.json();
      setTimes(data.times || []);
    };

    fetchTimes();
  }, [stationId, direction]);
  console.log(times);
  return (
    <div className="flex-shrink-0">
      <Card className="border-white/20 bg-white/10 text-white backdrop-blur-md">
        <CardContent className="min-w-[320px] p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Train className="h-5 w-5" />
              <h2 className="text-lg font-medium">Next Trains</h2>
            </div>
            <StationSelector
              selectedStations={selectedStations}
              setSelectedStations={setSelectedStations}
            ></StationSelector>
          </div>

          <div className="space-y-4">
            {stations.map((stationConfig, idx) => (
              <div key={`${stationConfig.station}-${stationConfig.direction}`}>
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-medium opacity-90">
                    {stationConfig.station.replace("-", " - ")}
                  </h3>
                  <span className="text-xs capitalize opacity-70">
                    {stationConfig.direction}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {getNextDepartures(stationConfig).map((departure, i) => (
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
                        {departure.time}m
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
