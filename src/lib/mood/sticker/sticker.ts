import { GIPHY_API_KEY } from "$env/static/private";
import type { GiphyResponse } from "../types";

export const BASE_URL = "https://api.giphy.com/v1/stickers";

export async function getStickers(url: URL) {
  url.searchParams.set("api_key", GIPHY_API_KEY);
  url.searchParams.set("limit", "25");

  const response = await fetch(url.toString());
  const data: GiphyResponse = await response.json();

  return data.data;
}
