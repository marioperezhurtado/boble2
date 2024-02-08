import { getUserById } from "$lib/db/user/getUserById";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params: { userId } }) => {
  const user = await getUserById(userId);

  // Redirect to home page if user not found
  if (!user) {
    redirect(307, "/");
  }

  return {
    invitingUser: user
  };
}
