import { isBlockedInChat } from "$lib/db/block/isBlockedInChat";
import { isParticipantInChat } from "$lib/db/participant/isParticipantInChat";
import { TRPCError } from "@trpc/server";

type Params = {
  userId: string;
  chatId: string;
};

export async function checkCanSendMessage({ userId, chatId }: Params) {
  const [isParticipant, isBlocked] = await Promise.all([
    isParticipantInChat({ userId, chatId }),
    isBlockedInChat({ userId, chatId }),
  ]);

  if (!isParticipant) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You are not a participant in this chat",
    });
  }

  if (isBlocked) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You are blocked in this chat",
    });
  }
}
