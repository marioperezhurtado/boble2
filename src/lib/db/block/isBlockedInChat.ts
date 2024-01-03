import { db } from "$lib/db/db";
import { block, participant } from "$lib/db/schema";
import { and, eq, or } from "drizzle-orm";

type IsBlockedInChatParams = {
  userId: string;
  chatId: string;
};

export async function isBlockedInChat({
  userId,
  chatId,
}: IsBlockedInChatParams) {
  const blocks = await db
    .select()
    .from(block)
    .innerJoin(participant, eq(participant.chatId, chatId))
    .where(
      or(
        // user is blocked in chat if they blocked the other user
        and(
          eq(block.userId, userId),
          eq(block.blockedUserId, participant.userId),
        ),
        // or if the other user blocked them
        and(
          eq(block.userId, participant.userId),
          eq(block.blockedUserId, userId),
        ),
      ),
    );

  return blocks.length > 0;
}
