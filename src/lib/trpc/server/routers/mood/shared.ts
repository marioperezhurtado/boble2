import { env } from "$env/dynamic/private";

export async function fetchFromGiphy(url: URL) {
  url.searchParams.set("api_key", env.GIPHY_API_KEY);
  url.searchParams.set("limit", "25");

  const response = await fetch(url.toString());
  const data: GiphyResponse = await response.json();

  return data.data;
}

/*
  These are not the complete types of the Giphy API response,
  but just the properties that are used or might be used in the near future.
*/
export type Gif = {
  id: string
  title: string
  images: {
    downsized: {
      url: string
      height: string
      width: string
    }
    downsized_small: {
      mp4: string
      height: string
      width: string
    }
  }
}

// GIFs and Stickers objects are the same
export type Sticker = Gif

export type GiphyResponse = {
  data: Gif[]
  pagination: {
    total_count: number
    count: number
    offset: number
  }
}
