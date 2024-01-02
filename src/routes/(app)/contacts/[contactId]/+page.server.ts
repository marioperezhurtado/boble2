import { error, redirect } from '@sveltejs/kit';
import { getChatByParticipants } from '$lib/db/chat/getChatByParticipants';
import { createChat } from '$lib/db/chat/createChat';
import { getSessionRequired } from '$lib/auth/auth';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
  const { contacts } = await parent();

  const contact = contacts.find((contact) => contact.id === params.contactId);
  if (!contact) {
    redirect(302, '/contacts');
  }

  return { contact };
}

export const actions = {
  async openChat({ request, locals }) {
    const session = await getSessionRequired(locals.auth);
    const formData = await request.formData();

    const contactId = formData.get('contactId') as string;
    if (!contactId) {
      error(400, 'Bad Request');
    }

    const existingChat = await getChatByParticipants(session.user.id, contactId);
    if (existingChat) {
      redirect(302, `/${existingChat.id}`);
    }

    const newChat = await createChat(session.user.id, contactId);

    redirect(302, `/${newChat.id}`);
  },

} satisfies Actions;  
