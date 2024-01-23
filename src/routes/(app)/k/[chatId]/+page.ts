import { decryptMessageField } from '$lib/utils/encryption';

import type { PageLoad } from './$types';

/* Takes derived key from layout data
/* and decrypts chat messages
*/

export const load: PageLoad = async ({ data }) => {
  const decryptedMessages = await Promise.all(
    data.messages.map(async (message) => {
      message.text = await decryptMessageField(message.text, data.chat.id);
      message.source = await decryptMessageField(message.source, data.chat.id);

      if (message.documentInfo) {
        message.documentInfo.name = await decryptMessageField(
          message.documentInfo.name,
          data.chat.id
        );
      }

      return message;
    })
  );

  return {
    ...data,
    messages: decryptedMessages
  };
}
