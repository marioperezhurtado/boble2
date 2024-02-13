import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, parent }) => {
  const { contacts } = await parent();

  const contact = contacts.find((contact) => contact.id === params.contactId);
  if (!contact) {
    redirect(302, '/contacts');
  }

  return { contact };
}
