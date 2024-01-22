import { decrypt } from '$lib/utils/encryption';

import type { PageLoad } from './$types';

/* Takes derived key from layout data
/* and decrypts chat messages
*/

export const load: PageLoad = async ({ parent, data }) => {
  const parentData = await parent();

  const chat = parentData.chats.find((chat) => chat.id === data.chat.id);

  const decryptedMessages = await Promise.all(data.messages.map(async (message) => {
    if (!message.text) return message;

    const decryptedText = await decrypt(message.text, chat!.derivedKey);

    return {
      ...message,
      text: decryptedText
    };
  }));

  return {
    ...data,
    chat: chat!,
    messages: decryptedMessages
  };
}
