import { audioInfo } from "$lib/db/schema";
import { db } from "$lib/db/db";
import type { InferInsertModel } from "drizzle-orm";

export async function createAudioInfo(info: InferInsertModel<typeof audioInfo>) {
  const createdDocumentInfo = await db
    .insert(audioInfo)
    .values(info)
    .returning();

  return createdDocumentInfo[0];
}
