import { BASE_FEED_URL, LINE_FEED_SUFFIXES } from "@/lib/trains/trainConfig";


/**
 * Constructs the full GTFS-Realtime feed URL for a specific MTA subway line.
 *
 * @param line - The subway line identifier (e.g., "L", "A", "6")
 * @returns A full URL string to the GTFS-Realtime feed for the given line
 * @throws If the line is not recognized in the configuration
 */
export function getTrainFeedUrl(line: string): string {
    const suffix = LINE_FEED_SUFFIXES[line.toUpperCase()];
    if (suffix === undefined) {
      throw new Error(`Unknown train line: ${line}`);
    }
  
    return `${BASE_FEED_URL}${suffix}`;
  }