import { writable } from "svelte/store";
import type { RouterOutputs } from "$lib/trpc/server/trpc";

export type EmojiData = RouterOutputs["mood"]["emoji"]["getAll"];

export type Emoji = EmojiData["smileys-and-people"][number];

export const hoveredEmoji = writable<Emoji | null>(null);

export function parseUnicodeEmoji(emoji: string) {
  return String.fromCodePoint(parseInt(emoji, 16));
}
