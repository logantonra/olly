"use server";

import {
  WeatherBackground,
  WeatherDisplay,
  SubwayDisplay,
  MessagesDisplay,
} from "@/components/dailydash";

export default async function DailyDash() {
  return (
    <>
      <WeatherBackground />

      {/* 2-column portrait grid */}
      <div className="relative z-10 h-screen w-full px-6 py-8">
        <div
          className="grid h-full gap-6"
          style={{
            gridTemplateColumns: "800px 1fr", // slimmer left gutter
            gridTemplateRows: "auto 1fr",
          }}
        >
          <div className="flex justify-start">
            <WeatherDisplay />
          </div>

          {/* right column */}
          <div className="col-start-2">
            <SubwayDisplay />
          </div>

          <div className="col-start-2 row-start-2">
            <MessagesDisplay />
          </div>
        </div>
      </div>
    </>
  );
}
