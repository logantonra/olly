import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin } from "lucide-react";
import { BOROUGH_OPTIONS } from "@/lib/weather/weatherConfig";

interface LocationSelectorProps {
  tempLocation: string;
  setTempLocation: (location: string) => void;
}

export function LocationSelector({
  tempLocation,
  setTempLocation,
}: LocationSelectorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSaveLocation = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="p-1 text-white hover:bg-white/20"
          >
            <MapPin className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="rounded-xl bg-white text-black shadow-xl">
          <DialogHeader>
            <DialogTitle>Select a Borough</DialogTitle>
          </DialogHeader>

          <div className="mt-4 flex items-center justify-between gap-4 overflow-x-auto px-4 py-2">
            {BOROUGH_OPTIONS.map(({ name, value, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setTempLocation(value)}
                className={`flex h-20 w-20 flex-col items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-105 focus:outline-none ${
                  tempLocation === value ? "ring-4 ring-black" : ""
                } ${
                  value === "manhattan"
                    ? "bg-yellow-500"
                    : value === "brooklyn"
                    ? "bg-red-500"
                    : value === "queens"
                    ? "bg-green-500"
                    : value === "bronx"
                    ? "bg-blue-500"
                    : "bg-purple-500"
                }`}
                title={name}
              >
                <Icon className="h-6 w-6" />
                <span className="mt-1 text-[11px] font-medium">{name}</span>
              </button>
            ))}
          </div>

          <Button onClick={handleSaveLocation} className="mt-6 w-full">
            Save Location
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
