import { getTrainFeedUrl } from "@/lib/trains/utils/trainUrls"
import GtfsRealtimeBindings from "gtfs-realtime-bindings";

/**
 * Fetches and decodes the GTFS-Realtime feed for a specific MTA subway line.
 *
 * @param line - The MTA subway line (e.g., "L", "A", "1")
 * @returns A decoded FeedMessage containing trip and vehicle updates
 * @throws If the request fails, the content-type is unexpected, or decoding fails
 */
export async function getMTAFeed(line: string): Promise<GtfsRealtimeBindings.transit_realtime.IFeedMessage> {
    const url = getTrainFeedUrl(line);

    // TODO: Add ~30 second caching here
    const response = await fetch(url, { cache: "no-store" });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch train feed: ${response.statusText}`);
    }
  
    const contentType = response.headers.get("content-type");
    if (
      !contentType ||
      (
        !contentType.includes("application/x-protobuf") &&
        !contentType.includes("application/octet-stream") &&
        !contentType.includes("text/plain")
      )
    ) {
      const errorText = await response.text();
      console.error("MTA error:", errorText);
      throw new Error(`Unexpected content-type: ${contentType}`);
    }
  
    const buffer = await response.arrayBuffer();
    const uint8 = new Uint8Array(buffer);
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(uint8);
  
    return feed;
  }