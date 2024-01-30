import { getContacts } from '$lib/db/contact/getContacts';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent }) => {
  const { user } = await parent();
  const contacts = await getContacts(user.id);

  return { contacts };
}
