import type { LayoutServerLoad } from "./$types";

export const ssr = false;

export const load: LayoutServerLoad = async ({ locals }) => {
  return { user: locals.session?.user };
}
