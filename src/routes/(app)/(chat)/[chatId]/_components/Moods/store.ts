import { writable } from "svelte/store";

export const isOpen = writable(false);
export const selectedMood = writable<"Emoji" | "GIF" | "Sticker">("Emoji");
