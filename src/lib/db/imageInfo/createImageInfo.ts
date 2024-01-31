import { imageInfo } from "$lib/db/schema";
import { db } from "$lib/db/db";
import type { InferInsertModel } from "drizzle-orm";

export async function createImageInfo(info: InferInsertModel<typeof imageInfo>) {
  const createdImageInfo = await db
    .insert(imageInfo)
    .values(info)
    .returning();

  return createdImageInfo[0];
}
