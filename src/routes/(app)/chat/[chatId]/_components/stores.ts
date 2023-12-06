import { writable } from 'svelte/store';
import type { Message } from '$lib/db/message/getMessages';

export const replyingTo = writable<Message | null>(null);
