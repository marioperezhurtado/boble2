import { db } from "$lib/db/db";
import { block } from "$lib/db/schema";

type CreateBlockParams = {
  userId: string;
  blockUserId: string;
}

export function createBlock({ userId, blockUserId }: CreateBlockParams) {
  return db
    .insert(block)
    .values({
      userId,
      blockedUserId: blockUserId,
      createdAt: new Date(),
    })
}
