import { BASE_URL, getStickers } from "./sticker";

export async function searchStickers(query: string) {
  const url = new URL(`${BASE_URL}/search`);
  url.searchParams.set("q", query);

  return getStickers(url);
}
