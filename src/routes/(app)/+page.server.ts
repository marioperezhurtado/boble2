import { auth, getSessionRequired } from '$lib/auth/auth';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  redirect(302, "/k");
}

export const actions = {
  logout: async ({ locals }) => {
    const session = await getSessionRequired(locals.auth);

    await auth.invalidateSession(session.sessionId);
    locals.auth.setSession(null);
  },
} satisfies Actions;
