import { decryptMessage } from '$lib/utils/encryption';

import type { PageLoad } from './$types';

// Decrypts all chat messages
export const load: PageLoad = async ({ data }) => {
  const decryptedMessages = await Promise.all(
    data.messages.map(async (message) => decryptMessage(message, data.chat.id))
  );

  return {
    ...data,
    messages: decryptedMessages
  };
}
