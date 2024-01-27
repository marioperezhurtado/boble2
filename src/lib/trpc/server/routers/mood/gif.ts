import { createTRPCRouter, protectedProcedure } from "$lib/trpc/server/trpc";
import { fetchFromGiphy } from "./shared";
import { z } from "zod";

export const BASE_URL = "https://api.giphy.com/v1/gifs";

export const gifRouter = createTRPCRouter({
  getTrending: protectedProcedure
    .query(() => {
      const url = new URL(`${BASE_URL}/trending`);

      return fetchFromGiphy(url);
    }),
  search: protectedProcedure
    .input(z.string())
    .query(async ({ input }) => {
      const url = new URL(`${BASE_URL}/search`)
      url.searchParams.set("q", input);

      const result = await fetchFromGiphy(url);

      return result.map((gif) => ({
        id: gif.id,
        title: gif.title,
        images: {
          downsized: {
            url: gif.images.downsized.url,
            height: gif.images.downsized.height,
            width: gif.images.downsized.width,
          },
          downsized_small: {
            mp4: gif.images.downsized_small.mp4,
            height: gif.images.downsized_small.height,
            width: gif.images.downsized_small.width,
          },
        },
      }));
    }),
});
