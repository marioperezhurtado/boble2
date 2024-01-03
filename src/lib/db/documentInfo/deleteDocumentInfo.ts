import { db } from "$lib/db/db";
import { documentInfo } from "$lib/db/schema";
import { eq } from "drizzle-orm";

export function deleteDocumentInfo(documentUrl: string) {
  return db.delete(documentInfo).where(eq(documentInfo.url, documentUrl));
}
