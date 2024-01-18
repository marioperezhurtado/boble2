import { getContacts } from '$lib/db/contact/getContacts';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  const contacts = await getContacts(locals.session.user.id);

  return { contacts };
}
