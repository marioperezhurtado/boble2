import { z } from "zod";
import { protectedProcedure } from "$lib/trpc/server/trpc";

function decodeHtml(html: string) {
  return html.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec));
}

export const generateLinkPreview = protectedProcedure
  .input(z.string().url())
  .mutation(async ({ input }) => {
    const response = await fetch(input);
    const html = await response.text();
    const decodedHtml = decodeHtml(html);

    const title = decodedHtml.match(
      /<title>(.*?)<\/title>/
    )?.[1];
    const description = decodedHtml.match(
      /<meta name="description" content="(.*?)">/
    )?.[1];
    const image = decodedHtml.match(
      /<meta property="og:image" content="(.*?)">/
    )?.[1];
    const siteName = decodedHtml.match(
      /<meta property="og:site_name" content="(.*?)">/
    )?.[1];

    return { 
      title: title ?? null,
      description: description ?? null,
      image: image ?? null,
      siteName: siteName ?? null,
    };
  });
