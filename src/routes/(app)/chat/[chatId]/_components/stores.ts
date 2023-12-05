import { writable } from 'svelte/store';
import type { Message } from '$lib/db/message/getMessages';

export const chatInfoOpen = writable(false);

export const replyingTo = writable<Message | null>(null);
