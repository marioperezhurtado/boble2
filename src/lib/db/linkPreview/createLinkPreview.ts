import { linkPreview } from "$lib/db/schema";
import { db } from "$lib/db/db";
import type { InferInsertModel } from "drizzle-orm";

type CreateLinkPreview = Omit<InferInsertModel<typeof linkPreview>, "createdAt"> & {
  messageId: string;
};

export async function createLinkPreview({
  title,
  description,
  image,
  siteName,
  messageId,
}: CreateLinkPreview) {
  const createdLinkPreview = await db
    .insert(linkPreview)
    .values({
      title,
      description,
      image,
      siteName,
      messageId,
    })
    .returning();

  return createdLinkPreview[0];
}
