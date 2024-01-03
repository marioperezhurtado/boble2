import { fail } from "@sveltejs/kit";
import { getSessionRequired } from "$lib/auth/auth";
import { searchStickers as searchStickersFromApi } from "$lib/mood/sticker/searchStickers";
import type { RequestEvent } from "../$types";

export async function searchStickers({ request, locals }: RequestEvent) {
  await getSessionRequired(locals.auth);

  const formData = await request.formData();
  const query = formData.get("search") as string;

  if (!query) {
    return fail(400, { error: "Search query is required" });
  }

  const stickerResults = await searchStickersFromApi(query);

  return { stickerResults };
}
