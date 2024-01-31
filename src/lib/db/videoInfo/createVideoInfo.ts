import { db } from "$lib/db/db";
import { videoInfo} from "$lib/db/schema";
import type { InferInsertModel } from "drizzle-orm";

export async function createVideoInfo(info: InferInsertModel<typeof videoInfo>) {
  const createdVideoInfo = await db
    .insert(videoInfo)
    .values(info)
    .returning();

  return createdVideoInfo[0];
}
