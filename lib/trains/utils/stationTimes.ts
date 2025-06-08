import { getMTAFeed } from "@/lib/trains/utils/trainFeeds";

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
          const time = stop.departure.time.toNumber();
          if (time >= now) {
            stopTimes.push(time);
          }
        }
      }
    }
  
    return stopTimes.sort((a, b) => a - b);
  }