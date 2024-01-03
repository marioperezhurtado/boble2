import { linkPreview } from "$lib/db/schema";
import { db } from "$lib/db/db";
import { eq } from "drizzle-orm";

export async function getLinkPreview(url: URL) {
  const linkPreviewData = await db
    .select()
    .from(linkPreview)
    .where(eq(linkPreview.url, url.toString()));

  return linkPreviewData[0];
}
