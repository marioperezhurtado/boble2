import { error, fail, redirect } from "@sveltejs/kit";
import { getUserByEmail } from "$lib/db/user/getUserByEmail";
import { createContact } from "$lib/db/contact/createContact";
import type { Actions } from "./$types";

export const actions = {
  async addContact({ request, locals }) {
    const session = await locals.auth.validate();
    if (!session) {
      throw error(401, "Unauthorized");
    }

    const formData = await request.formData();
    const email = formData.get("email") as string;
    if (!email) {
      return fail(400, { error: "Email address is required" });
    }

    const alias = formData.get("alias") as string;
    if (!alias) {
      return fail(400, { error: "Alias is required" });
    }
    if (alias.length < 3) {
      return fail(400, { error: "Alias must be at least 3 characters" });
    }

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return fail(400, { error: "User not found" });
    }

    await createContact({
      userId: session.user.id,
      contactId: existingUser.id,
      alias,
    });

    throw redirect(302, `/contacts/${existingUser.id}`);
  }
} satisfies Actions;
