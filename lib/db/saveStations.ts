"use server";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { Resource } from "sst";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import type { Station } from "@/lib/db/types";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export async function saveStations(stations: readonly [Station, Station]) {
  const session = await auth();
  if (!session) throw new Error("not-auth");

  await ddb.send(
    new UpdateCommand({
      TableName: Resource.UserSettings.name,
      Key: { userEmail: session.user.email },
      UpdateExpression: "SET #stations = :s",
      ExpressionAttributeNames: { "#stations": "stations" },
      ExpressionAttributeValues: { ":s": stations },
    }),
  );

  /* ensure /settings re-renders with the fresh values */
  revalidatePath("/settings");
}
