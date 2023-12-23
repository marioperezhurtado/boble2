import { BASE_URL, getGifs } from "./gif";

export async function getTrendingGifs() {
  return getGifs(new URL(`${BASE_URL}/trending`));
}
