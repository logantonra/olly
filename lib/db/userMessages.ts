import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  QueryCommand,
  PutCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { Resource } from "sst";
import { z } from "zod";

export class MessagesNotFoundError extends Error {}
export class MessageMalformedError extends Error {}
export class MessageDeleteError extends Error {}
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

export async function writeMessage({
  userEmail,
  content,
  senderName,
}: {
  userEmail: string;
  content: string;
  senderName: string;
}): Promise<UserMessage> {
  const messageId = uuidv4();
  const ttl = Math.floor(Date.now() / 1000) + 48 * 60 * 60; // now + 48 hours

  const item: UserMessage = {
    userEmail,
    messageId,
    content,
    senderName,
    ttl,
  };

  const validated = messageSchema.safeParse(item);
  if (!validated.success) {
    console.error("Message validation failed", validated.error.format());
    throw new MessageMalformedError("Invalid message payload");
  }

  try {
    await ddb.send(
      new PutCommand({
        TableName: Resource.Messages.name,
        Item: item,
      }),
    );

    return validated.data;
  } catch (err) {
    console.error("Failed to write message", err);
    throw new MessagesReadError("Failed to write message to DynamoDB");
  }
}

export async function deleteMessage(
  userEmail: string,
  messageId: string,
): Promise<true> {
  try {
    await ddb.send(
      new DeleteCommand({
        TableName: Resource.Messages.name,
        Key: { userEmail, messageId },
      }),
    );
    return true;
  } catch (err) {
    console.error("Failed to delete message", err);
    throw new MessageDeleteError("Unable to delete message in DynamoDB");
  }
}