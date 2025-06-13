"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { STOPS_BY_LINE, SUBWAY_COLORS } from "@/lib/trains/trainConfig";
import { Station, StationSelectorProps } from "@/lib/trains/utils/types";

export function StationSelector({
  selectedStations,
  setSelectedStations,
}: StationSelectorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [selectedStationIndex, setSelectedStationIndex] = useState<
    number | null
  >(null);
  const [selectedStationTemp, setSelectedStationTemp] =
    useState<Station | null>(null);
  const [confirmationMsg, setConfirmationMsg] = useState<string | null>(null);

  const handleStationBoxClick = (index: number) => {
    setSelectedStationIndex(index);
    setSelectedLine(null);
    setSelectedStationTemp(null);
  };

  const handleLineSelect = (line: string) => {
    setSelectedLine(line);
  };

  const handleStationSelect = (station: Station) => {
    setSelectedStationTemp(station); // NEW: wait for direction selection
  };

  const handleDirectionSelect = (direction: "Northbound" | "Southbound") => {
    if (selectedStationIndex !== null && selectedStationTemp) {
      const updated = [...selectedStations];
      updated[selectedStationIndex] = {
        ...selectedStationTemp,
        direction,
      };
      setSelectedStations(updated);
      setSelectedLine(null);
      setSelectedStationIndex(null);
      setSelectedStationTemp(null);
      setConfirmationMsg(
        `Station updated to ${selectedStationTemp.name} (${direction})`,
      );
      setTimeout(() => setConfirmationMsg(null), 10000); // clear after 3s
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogDescription className="sr-only">
        Select a station and direction to configure your subway display.
      </DialogDescription>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/20"
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[720px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-lg">Select Subway Stations</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          {selectedStations.map((station, index) => (
            <div
              key={index}
              className={`cursor-pointer rounded-lg border p-4 transition ${
                index === selectedStationIndex
                  ? "border-blue-500 bg-blue-50"
                  : "hover:bg-accent border-border"
              }`}
              onClick={() => handleStationBoxClick(index)}
            >
              <div className="mb-1 text-sm font-semibold">
                Station {index + 1}: {station.name || "Not selected"}
              </div>
              <div className="text-muted-foreground text-xs">
                {station.direction || "Tap to change"}
              </div>
            </div>
          ))}
        </div>

        {selectedStationIndex !== null &&
          !selectedLine &&
          !selectedStationTemp && (
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-medium">Select a Train Line</h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(STOPS_BY_LINE).map((line) => (
                  <Badge
                    key={line}
                    style={{
                      backgroundColor:
                        SUBWAY_COLORS[line as keyof typeof SUBWAY_COLORS],
                    }}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-0 text-xs font-medium text-white hover:opacity-80"
                    onClick={() => handleLineSelect(line)}
                  >
                    {line}
                  </Badge>
                ))}
              </div>
            </div>
          )}

        {selectedLine && !selectedStationTemp && (
          <div className="mt-6">
            <h3 className="mb-3 text-sm font-medium">
              Select a Station on the {selectedLine} Line
            </h3>
            <div className="max-h-48 overflow-y-auto rounded-md border p-3">
              {STOPS_BY_LINE[selectedLine as keyof typeof STOPS_BY_LINE].map(
                (stop) => (
                  <div
                    key={stop.id}
                    className="hover:bg-accent cursor-pointer rounded px-3 py-2 text-sm"
                    onClick={() =>
                      handleStationSelect({
                        name: stop.name,
                        id: stop.id,
                        direction: "Northbound",
                      })
                    }
                  >
                    {stop.name}
                  </div>
                ),
              )}
            </div>
          </div>
        )}

        {selectedStationTemp && (
          <div className="mt-6">
            <h3 className="mb-3 text-sm font-medium">Select Train Direction</h3>
            <div className="flex gap-3">
              <Button onClick={() => handleDirectionSelect("Northbound")}>
                Northbound
              </Button>
              <Button onClick={() => handleDirectionSelect("Southbound")}>
                Southbound
              </Button>
            </div>
          </div>
        )}

        {confirmationMsg && (
          <div className="mt-4 text-center text-sm text-green-600">
            {confirmationMsg}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
