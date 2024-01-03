import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { participant } from "../schema";

type IsParticipantParams = {
  userId: string;
  chatId: string;
};

export async function isParticipant({ userId, chatId }: IsParticipantParams) {
  const existingParticipant = await db
    .select({ id: participant.userId })
    .from(participant)
    .where(and(
      eq(participant.userId, userId),
      eq(participant.chatId, chatId),
    ))

  return existingParticipant.length > 0;
}
