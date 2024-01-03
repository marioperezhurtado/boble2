import { documentInfo } from "$lib/db/schema";
import { db } from "$lib/db/db";
import type { InferInsertModel } from "drizzle-orm";

export async function createDocumentInfo(
  info: InferInsertModel<typeof documentInfo>,
) {
  const createdDocumentInfo = await db
    .insert(documentInfo)
    .values(info)
    .returning();

  return createdDocumentInfo[0];
}
