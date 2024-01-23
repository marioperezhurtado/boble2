import { goto } from '$app/navigation';
import { deriveKey, decryptMessage } from '$lib/utils/encryption';
import type { LayoutLoad } from './$types';

/* Retrieves or generates derived key for each chat
/* and decrypts the last message 
*/

export const load: LayoutLoad = async ({ data, fetch }) => {
  const privateKey = localStorage.getItem(`sk`);

  // If private key is not stored locally, log out
  if (!privateKey) {
    await fetch('/?/logout', {
      method: 'POST',
      body: new FormData(),
    });
    goto('/login');
  }

  const decryptedChats = await Promise.all(data.chats.map(async (chat) => {
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
