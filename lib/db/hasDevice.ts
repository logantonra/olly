/* lib/db/hasDevice.ts */
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { Resource } from "sst";
import { auth } from "@/auth";

const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({}));

export async function userHasDevice(): Promise<boolean> {
  const session = await auth();
  if (!session) return false;

  const res = await ddb.send(
    new QueryCommand({
      TableName: Resource.UserSettings.name,          // your devices table
      KeyConditionExpression: "userEmail = :u",
      ExpressionAttributeValues: { ":u": session.user.email },
      Limit: 1,
    }),
  );
  return (res.Items?.length ?? 0) > 0;
}
