import { BASE_URL, getGifs } from "./gif";

export async function searchGifs(query: string) {
  const url = new URL(`${BASE_URL}/search`);
  url.searchParams.set("q", query);

  return getGifs(url);
}
