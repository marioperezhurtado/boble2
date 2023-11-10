import { error, fail, redirect } from '@sveltejs/kit';
import { getChatByParticipants } from '$lib/db/chat/getChatByParticipants';
import { createChat } from '$lib/db/chat/createChat';
import { deleteContact } from '$lib/db/contact/deleteContact';
import { getUserByEmail } from '$lib/db/user/getUserByEmail';
import { editContact } from '$lib/db/contact/editContact';
import { getSessionRequired } from '$lib/auth/auth';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
  const { contacts } = await parent();

  const contact = contacts.find((contact) => contact.id === params.contactId);
  if (!contact) {
    throw redirect(302, '/contacts');
  }

  return { contact };
}

export const actions = {
  async openChat({ request, locals }) {
    const session = await getSessionRequired(locals.auth);
    const formData = await request.formData();

    const contactId = formData.get('contactId') as string;
    if (!contactId) {
      throw error(400, 'Bad Request');
    }

    const existingChat = await getChatByParticipants(session.user.id, contactId);
    if (existingChat) {
      throw redirect(302, `/chat/${existingChat.id}`);
    }

    const newChat = await createChat(session.user.id, contactId);
    throw redirect(302, `/chat/${newChat.id}`);
  },
  async removeContact({ request, locals }) {
    const session = await getSessionRequired(locals.auth);
    const formData = await request.formData();

    const contactId = formData.get('contactId') as string;
    if (!contactId) {
      throw error(400, 'Bad Request');
    }

    await deleteContact({ userId: session.user.id, contactId });

    throw redirect(302, '/contacts');
  },
  async editContact({ request, locals }) {
    const session = await getSessionRequired(locals.auth);
    const formData = await request.formData();

    const contactId = formData.get("contactId") as string;
    if (!contactId) {
      throw error(400, 'Bad Request');
    }

    const email = formData.get("email") as string;
    if (!email) {
      return fail(401, { error: "Email address is required" });
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

    await editContact({
      userId: session.user.id,
      contactId: contactId,
      newAlias: alias,
      newContactId: existingUser.id,
    });

    throw redirect(302, `/contacts/${existingUser.id}`);
  }
} satisfies Actions;  
