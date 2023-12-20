import { fail, redirect } from "@sveltejs/kit";
import { editUser } from "$lib/db/user/editUser";
import { getSessionRequired } from "$lib/auth/auth";
import type { Actions } from "./$types";

export const actions = {
  editProfile: async ({ request, locals }) => {
    const session = await getSessionRequired(locals.auth);
    const formData = await request.formData();

    const name = formData.get("name") as string;
    if (!name) {
      return fail(400, { error: "Name is required." });
    }
    if (name.length < 3) {
      return fail(400, { error: "Name is too short." });
    }

    const status = formData.get("status") as string;
    if (status.length > 150) {
      return fail(400, { error: "Status is too long." });
    }

    await editUser({ name, status, id: session.user.id });

    redirect(302, "/profile");
  },
} satisfies Actions;
