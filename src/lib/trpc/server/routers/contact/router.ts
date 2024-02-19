import { createTRPCRouter } from '$lib/trpc/server/trpc';
import { getContacts } from './getContacts';
import { addContact } from './addContact';
import { editContact } from './editContact';
import { deleteContact } from './deleteContact';

export const contactRouter = createTRPCRouter({
  getAll: getContacts,
  add: addContact,
  edit: editContact,
  delete: deleteContact,
});
