import { getStopTimesForStation } from "@/lib/trains/utils/stationTimes";

export default async function Home() {
  let departures: string[] = [];
  try {
    const upcoming = await getStopTimesForStation("L", "L03", "S");
    const now = Math.floor(Date.now() / 1000);
    departures = upcoming
      .slice(0, 3)
      .map((t) => Math.round((t - now) / 60))
      .map((m) => (m <= 0 ? "Now" : `${m} min`));
  } catch (error) {
    console.error("Error loading stop times:", error);
    departures = [];
  }
  return (
    <>
      <div className="z-10 w-full max-w-full  px-5 xl:px-0">
        <h1
          className="animate-fade-up bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm [text-wrap:balance] md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          This will be the dashboard
        </h1>
      </div>
      <p className="text-lg text-gray-600">8th Ave Station (Manhattan-bound)</p>
      <div className="mt-4 font-mono text-xl">
        {departures.length > 0 ? (
          <p>
            Next departures:{" "}
            <span className="font-semibold">{departures.join(", ")}</span>
          </p>
        ) : (
          <p>No upcoming departures or failed to load</p>
        )}
      </div>
    </>
  );
}
