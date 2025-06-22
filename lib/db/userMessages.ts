import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  QueryCommand,
  GetCommand,
} from "@aws-sdk/lib-dynamodb";
import { Resource } from "sst";
import { z } from "zod";

export class MessagesNotFoundError extends Error {}
export class MessageMalformedError extends Error {}
export class MessagesReadError extends Error {}

const ddb = DynamoDBDocumentClient.from(
  new DynamoDBClient({}),
  { marshallOptions: { removeUndefinedValues: true } },
);

export interface UserMessage {
  userEmail:  string;
  messageId:  string;
  content:    string;
  senderName: string;
  ttl:       number;
}

const messageSchema: z.ZodType<UserMessage> = z.object({
  userEmail:  z.string().email(),
  messageId:  z.string(),
  content:    z.string(),
  senderName: z.string(),
  ttl:        z.number(),
});

export async function listUserMessages(
  userEmail: string,
): Promise<UserMessage[]> {
  try {
    const { Items } = await ddb.send(
      new QueryCommand({
        TableName:   Resource.Messages.name,
        KeyConditionExpression: "userEmail = :u",
        ExpressionAttributeValues: { ":u": userEmail },
      }),
    );

    if (!Items || Items.length === 0) return [];

    const parsed = Items.map((raw) => {
      const res = messageSchema.safeParse(raw);
      if (!res.success) {
        console.error(
          "Malformed message row",
          raw,
          res.error.format(),
        );
        throw new MessageMalformedError("Failed schema validation");
      }
      return res.data;
    });

    return parsed;
  } catch (err) {
    if (err instanceof MessageMalformedError) throw err;
    console.error("DynamoDB query failed", err);
    throw new MessagesReadError("Unable to load user messages");
  }
}