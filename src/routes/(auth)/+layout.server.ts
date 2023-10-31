import type { LayoutServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const session = await locals.auth.validate();
  const redirectTo = url.searchParams.get("redirectTo");

  if (session) throw redirect(302, redirectTo || "/");
  return {};
};
