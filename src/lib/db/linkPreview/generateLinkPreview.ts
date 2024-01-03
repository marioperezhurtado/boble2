import { linkPreview } from "$lib/db/schema";
import { db } from "../db";

function decodeHtml(html: string): string {
  return html.replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec));
}

export async function generateLinkPreview(url: URL) {
  const response = await fetch(url);
  const html = await response.text();
  const decodedHtml = decodeHtml(html);

  const title = decodedHtml.match(/<title>(.*?)<\/title>/)?.[1];
  const description = decodedHtml.match(/<meta name="description" content="(.*?)">/)?.[1];
  const image = decodedHtml.match(/<meta property="og:image" content="(.*?)">/)?.[1];
  const siteName = decodedHtml.match(/<meta property="og:site_name" content="(.*?)">/)?.[1];

  const newLinkPreview = await db
    .insert(linkPreview)
    .values({
      url: url.toString(),
      title,
      description,
      image,
      siteName: siteName || url.hostname,
      createdAt: new Date(),
    })
    .onConflictDoUpdate({
      target: linkPreview.url,
      set: {
        title,
        description,
        image,
        siteName,
      },
    })
    .returning();

  return newLinkPreview[0];
}
