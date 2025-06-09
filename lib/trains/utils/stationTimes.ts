import { getMTAFeed } from "@/lib/trains/utils/trainFeeds";
import { LINES_BY_STATION } from "@/lib/trains/trainConfig";
/**
 * Retrieves the upcoming departure times (as Unix timestamps) for a given station and direction
 * from the GTFS-Realtime feed of a specific MTA subway line.
 *
 * @param line - The subway line (e.g., "L", "A", "1")
 * @param stationId - The MTA station ID (e.g., "L01", "123N")
 * @param direction - Travel direction: "N" for north-bound, "S" for south-bound
 * @returns A sorted array of Unix timestamps for upcoming departures (in seconds)
 */

export async function getStopTimesForStation(
  stationId: string,
  direction: "N" | "S"
): Promise<{ time: number; line: string }[]> {
  const stopId = `${stationId}${direction}`;
  const now = Math.floor(Date.now() / 1000);
  const lines = LINES_BY_STATION[stationId as keyof typeof LINES_BY_STATION] || [];

  const allFeeds = await Promise.allSettled(
    lines.map((line) => getMTAFeed(line).then((feed) => ({ line, feed })))
  );

  const stopTimes: { time: number; line: string }[] = [];

  for (const result of allFeeds) {
    if (result.status !== "fulfilled") continue;
    const { line, feed } = result.value;

    for (const entity of feed.entity ?? []) {
      if (!entity.tripUpdate?.stopTimeUpdate) continue;

      for (const stop of entity.tripUpdate.stopTimeUpdate) {
        if (stop.stopId === stopId && stop.departure?.time) {
          const time =
            typeof stop.departure.time === "number"
              ? stop.departure.time
              : stop.departure.time.toNumber?.();
          if (typeof time === "number" && time >= now) {
            stopTimes.push({ time, line });
          }
        }
      }
    }
  }

  return stopTimes.sort((a, b) => a.time - b.time);
}

export async function getStopTimesForLine(
    line: string,
    stationId: string,
    direction: "N" | "S"
  ): Promise<number[]> {
    const feed = await getMTAFeed(line);
    const stopId = `${stationId}${direction}`;
    const now = Math.floor(Date.now() / 1000);
  
    const stopTimes: number[] = [];
  
    for (const entity of feed.entity ?? []) {
      if (!entity.tripUpdate?.stopTimeUpdate) continue;
  
      for (const stop of entity.tripUpdate.stopTimeUpdate) {
        if (stop.stopId === stopId && stop.departure?.time) {
          const time =
            typeof stop.departure.time === "number"
              ? stop.departure.time
              : stop.departure.time.toNumber?.();
          if (time >= now) {
            stopTimes.push(time);
          }
        }
      }
    }
  
    return stopTimes.sort((a, b) => a - b);
  }