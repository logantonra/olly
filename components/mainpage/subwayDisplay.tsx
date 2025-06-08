"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Train, MapPin } from "lucide-react";

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

const subwayColors = {
  "1": "#EE352E",
  "2": "#EE352E",
  "3": "#EE352E",
  "4": "#00933C",
  "5": "#00933C",
  "6": "#00933C",
  "7": "#B933AD",
  L: "#A7A9AC",
  N: "#FCCC0A",
  Q: "#FCCC0A",
  R: "#FCCC0A",
  W: "#FCCC0A",
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
  // TODO: make the select a station not so ugly
  return (
    <div className="flex-shrink-0">
      <Card className="border-white/20 bg-white/10 text-white backdrop-blur-md">
        <CardContent className="min-w-[320px] p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Train className="h-5 w-5" />
              <h2 className="text-lg font-medium">Next Trains</h2>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Configure Stations</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  {stations.map((stationConfig, index) => (
                    <div key={index} className="space-y-3">
                      <Label className="text-base font-medium">
                        Station {index + 1}
                      </Label>
                      <div className="space-y-2">
                        <Select
                          value={stationConfig.station}
                          onValueChange={(value) =>
                            updateStation(index, "station", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select station" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.keys(mockSubwayData).map((station) => (
                              <SelectItem key={station} value={station}>
                                {station}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={stationConfig.direction}
                          onValueChange={(value: "northbound" | "southbound") =>
                            updateStation(index, "direction", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="northbound">
                              Northbound
                            </SelectItem>
                            <SelectItem value="southbound">
                              Southbound
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                  <Button
                    onClick={() => setIsDialogOpen(false)}
                    className="mt-4 w-full"
                  >
                    Save Changes
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
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
                            subwayColors[
                              departure.line as keyof typeof subwayColors
                            ],
                        }}
                        className="px-2 py-1 text-xs font-medium text-white"
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
