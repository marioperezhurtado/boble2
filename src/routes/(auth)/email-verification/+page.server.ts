import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals: { user } }) => {
  if (!user) {
    return redirect(302, '/login');
  }
  if (user.emailVerified) {
    return redirect(302, '/');
  }
}
