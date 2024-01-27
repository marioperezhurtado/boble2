import { goto } from '$app/navigation';
import { deriveKey, decryptMessageField } from '$lib/utils/encryption';
import type { LayoutLoad } from './$types';

/* Retrieves or generates derived key for each chat
/* and decrypts the last message 
*/

export const load: LayoutLoad = async ({ data }) => {
  const privateKey = localStorage.getItem(`sk`);

  // If private key is not stored locally, log out
  if (!privateKey) {
    goto('/logout');
  }

  const decryptedChats = await Promise.all(data.chats.map(async (chat) => {
    const storedDerivedKey = localStorage.getItem(`dk_${chat.id}`);

    const derivedKey = storedDerivedKey ||
      await deriveKey(chat.user.publicKey, privateKey!);

    localStorage.setItem(`dk_${chat.id}`, derivedKey);

    if (chat.lastMessage?.text) {
      chat.lastMessage.text = await decryptMessageField(
        chat.lastMessage.text,
        chat.id
      );
    }

    chat.documentName = await decryptMessageField(
      chat.documentName,
      chat.id
    );

    return chat;
  }));

  return {
    ...data,
    chats: decryptedChats
  }
}
