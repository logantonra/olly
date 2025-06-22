import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";
import { Resource } from "sst";
import { z } from "zod";
import type { UserSettings } from "@/lib/db/types";

export class SettingsNotFoundError extends Error {}
export class SettingsMalformedError extends Error {}
export class SettingsReadError extends Error {}

const ddb = DynamoDBDocumentClient.from(
  new DynamoDBClient({}),
  { marshallOptions: { removeUndefinedValues: true } },
);

/* ───────────────────────── Zod shape to sanity-check the row ─────────────── */

const settingsSchema: z.ZodType<UserSettings> = z.object({
  userEmail: z.string().email(),
  location: z.object({
    city:  z.string(),
    lat:   z.string(),
    long:  z.string(),
  }),
  stations: z.tuple([
    z.object({
      id: z.string(),
      name: z.string(),
      direction: z.enum(["Northbound", "Southbound"]),
    }),
    z.object({
      id: z.string(),
      name: z.string(),
      direction: z.enum(["Northbound", "Southbound"]),
    }),
  ]),
});

/* ───────────────────────────── Main helper ───────────────────────────────── */

export async function getUserSettings(
  userEmail: string,
): Promise<UserSettings | null> {
  try {
    const { Item } = await ddb.send(
      new GetCommand({
        TableName: Resource.UserSettings.name,
        Key: { userEmail },          // ←  partition key
      }),
    );

    if (!Item) return null;          // 404-ish – let the caller decide what to do

    const parsed = settingsSchema.safeParse(Item);
    if (!parsed.success) {
      console.error("Malformed UserSettings row", parsed.error.format());
      throw new SettingsMalformedError("UserSettings item failed schema validation");
    }

    return parsed.data;
  } catch (err) {
    // differentiate the Dynamo failure path from “not found” for observability
    if (
      err instanceof SettingsMalformedError ||
      err instanceof SettingsNotFoundError
    ) {
      throw err;
    }
    console.error("DynamoDB read failed", err);
    throw new SettingsReadError("Unable to load user settings");
  }
}