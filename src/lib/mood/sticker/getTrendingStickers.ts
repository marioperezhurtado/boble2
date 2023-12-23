import { BASE_URL, getStickers } from "./sticker";

export async function getTrendingStickers() {
  return getStickers(new URL(`${BASE_URL}/trending`));
}
