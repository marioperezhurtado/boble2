import { fail } from "@sveltejs/kit";
import { getSessionRequired } from "$lib/auth/auth";
import { searchGifs as searchGifsFromApi } from "$lib/mood/gif/searchGifs";
import type { RequestEvent } from "../$types";

export async function searchGifs({ request, locals }: RequestEvent) {
  await getSessionRequired(locals.auth);

  const formData = await request.formData();
  const query = formData.get('search') as string;

  if (!query) {
    return fail(400, { error: "Search query is required" });
  }

  const gifResults = await searchGifsFromApi(query);

  return { gifResults };
}
