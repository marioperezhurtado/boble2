import { and, eq } from "drizzle-orm";
import { db } from "$lib/db/db";
import { block } from "$lib/db/schema";

type RemoveBlockParams = {
  userId: string;
  unblockUserId: string;
}

export function removeBlock({ userId, unblockUserId }: RemoveBlockParams) {
  return db
    .delete(block)
    .where(and(
      eq(block.userId, userId),
      eq(block.blockedUserId, unblockUserId),
    ))
}
