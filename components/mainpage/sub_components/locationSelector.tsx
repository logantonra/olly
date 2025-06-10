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

          <div className="mt-4 flex items-center justify-between gap-3 overflow-x-auto px-2">
            {BOROUGH_OPTIONS.map(({ name, value, icon: Icon, color }) => (
              <button
                key={value}
                onClick={() => setTempLocation(value)}
                className={`flex h-16 w-16 flex-col items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-105 focus:outline-none ${
                  tempLocation === value ? "ring-4 ring-black" : ""
                } ${color}`}
                title={name}
              >
                <Icon className="h-5 w-5" />
                <span className="mt-1 text-[10px]">{name}</span>
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
