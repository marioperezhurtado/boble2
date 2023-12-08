import { fail, redirect } from "@sveltejs/kit";
import { getUserByEmail } from "$lib/db/user/getUserByEmail";
import { getContactByEmail } from "$lib/db/contact/getContactByEmail";
import { createContact } from "$lib/db/contact/createContact";
import { getSessionRequired } from "$lib/auth/auth";
import { deleteContact } from "$lib/db/contact/deleteContact";
import type { Actions } from "./$types";
import { editContact } from "$lib/db/contact/editContact";

export const actions = {
  async addContact({ request, locals }) {
    const session = await getSessionRequired(locals.auth);
    const formData = await request.formData();

    const alias = (formData.get("alias") as string).trim();
    if (!alias) {
      return fail(400, { error: "Alias is required" });
    }
    if (alias.length < 3) {
      return fail(400, { error: "Alias must be at least 3 characters" });
    }

    const email = formData.get("email") as string;
    if (!email) {
      return fail(400, { error: "Email address is required" });
    }

    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
      return fail(400, { error: "User not found" });
    }

    const existingContact = await getContactByEmail({
      userId: session.user.id,
      contactEmail: email
    });
    if (existingContact) {
      return fail(400, { error: "Contact already exists" });
    }

    await createContact({
      userId: session.user.id,
      contactId: existingUser.id,
      alias,
    });

    throw redirect(302, `/contacts/${existingUser.id}`);
  },
  async removeContact({ request, locals }) {
    const session = await getSessionRequired(locals.auth);

    const formData = await request.formData();
    const contactId = formData.get("contactId") as string;

    if (!contactId) {
      return fail(400, { error: "Contact id not found" });
    }

    await deleteContact({ userId: session.user.id, contactId });
  },
  async editContact({ request, locals }) {
    const session = await getSessionRequired(locals.auth);
    const formData = await request.formData();

    const contactId = formData.get("contactId") as string;
    if (!contactId) {
      return fail(400, { error: "Contact id not found" });
    }

    const alias = (formData.get("alias") as string).trim();
    if (!alias) {
      return fail(400, { error: "Alias is required" });
    }
    if (alias.length < 3) {
      return fail(400, { error: "Alias must be at least 3 characters" });
    }

    await editContact({
      userId: session.user.id,
      contactId: contactId,
      newAlias: alias,
    });

    throw redirect(302, `/contacts/${contactId}`);
  }
} satisfies Actions;
