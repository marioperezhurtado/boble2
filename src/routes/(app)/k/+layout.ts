import { deriveKey, decryptMessage } from '$lib/utils/encryption';
import type { LayoutLoad } from './$types';


/* Retrieves or generates derived key for each chat
/* and decrypts the last message 
*/

export const load: LayoutLoad = async ({ data }) => {
  const decryptedChats = await Promise.all(data.chats.map(async (chat) => {
    const privateKey = localStorage.getItem(`sk`);
    const storedDerivedKey = localStorage.getItem(`dk_${chat.id}`);

    const derivedKey = storedDerivedKey ||
      await deriveKey(chat.user.publicKey, privateKey!);

    localStorage.setItem(`dk_${chat.id}`, derivedKey);

    if (chat.lastMessage) {
      chat.lastMessage = await decryptMessage(chat.lastMessage, chat.id);
    }

    return chat;
  }));

  return {
    ...data,
    chats: decryptedChats
  }
}
