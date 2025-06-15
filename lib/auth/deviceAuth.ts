import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Resource } from "sst";

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export async function deviceOwner(
  deviceId: string,
  deviceToken: string
): Promise<string> {
  try {
    const result = await dynamo.send(
      new GetCommand({
        TableName: Resource.Devices.name,
        Key: { deviceId },
      })
    );

    if (!result.Item) return "notfound";

    if (!result.Item.deviceToken || result.Item.deviceToken !== deviceToken) {
      return "notauthorized";
    }

    return result.Item.deviceOwner || "notfound";
  } catch (err) {
    console.error("Authorization error:", err);
    throw new Error("Internal error");
  }
}
