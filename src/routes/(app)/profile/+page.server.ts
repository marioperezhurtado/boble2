import { error, fail } from "@sveltejs/kit";
import { editUser } from "$lib/db/user/editUser";
import type { Actions } from "./$types";

export const actions = {
  editProfile: async (event) => {
    const session = await event.locals.auth.validate();

    if (!session) {
      throw error(401, "Unauthorized");
    }

    const formData = await event.request.formData();

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

    return { success: true };
  },
} satisfies Actions;
