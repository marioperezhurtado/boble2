import { decryptMessage } from '$lib/utils/encryption';

import type { PageLoad } from './$types';

/* Takes derived key from layout data
/* and decrypts chat messages
*/

export const load: PageLoad = async ({ data }) => {
  const decryptedMessages = await Promise.all(
    data.messages.map((message) => decryptMessage(message, data.chat.id))
  );

  return {
    ...data,
    messages: decryptedMessages
  };
}
