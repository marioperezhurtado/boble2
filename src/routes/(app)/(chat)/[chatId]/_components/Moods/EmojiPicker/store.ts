import { writable } from "svelte/store";
import emojis from "./emojis.json";

export type Emoji = (typeof emojis)["smileys-and-people"][number];

export const filteredEmojis = writable(emojis);
export const hoveredEmoji = writable<Emoji | null>(null);

export function parseUnicodeEmoji(emoji: string) {
  return String.fromCodePoint(parseInt(emoji, 16));
}
