import { createTRPCRouter } from '$lib/trpc/trpc';
import { addContact } from './addContact';
import { editContact } from './editContact';
import { deleteContact } from './deleteContact';

export const contactRouter = createTRPCRouter({
  add: addContact,
  edit: editContact,
  delete: deleteContact,
});
