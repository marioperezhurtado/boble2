<script lang="ts">
  import { page } from "$app/stores";
  import { goto, invalidateAll } from "$app/navigation";
  import { trpc } from "$lib/trpc/client";
  import type { Contact } from "$lib/db/contact/getContacts";
  import Button from "$lib/ui/Button.svelte";
  import Label from "$lib/ui/Label.svelte";
  import Input from "$lib/ui/Input.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import FormError from "$lib/ui/FormError.svelte";
  import Avatar from "$lib/ui/Avatar.svelte";
  export let contact: Contact;

  let isEditing = false;
  let alias = contact.alias;

  async function handleEditContact() {
    isEditing = true;

    try {
      await trpc($page).contact.edit.mutate({
        contactId: contact.id,
        alias,
      });
      await invalidateAll();
      goto(`/contacts/${contact.id}`);
    } catch (error) {
      console.error(error);
    }

    isEditing = false;
  }
</script>

<Modal title="Delete contact" backTo={$page.url.pathname}>
  <p class="text-sm text-zinc-500">Change the details of your contact.</p>

  <form
    on:submit|preventDefault={handleEditContact}
    class="flex flex-col gap-6 pt-8"
  >
    <div>
      <Label for="alias">
        Alias
        <Input bind:value={alias} name="alias" type="text" />
      </Label>
      <p class="pt-2 text-xs font-normal text-zinc-500">
        This is the name that will appear in your contact list.
      </p>
    </div>

    <div class="flex gap-3 items-center">
      <Avatar user={contact} size="small" />
      <div>
        <h2 class="text-sm font-semibold">{alias}</h2>
        <p class="text-xs break-all text-zinc-500">
          {contact.email}
        </p>
      </div>
    </div>

    <!--
    {#if editError}
      <FormError message={editError} />
    {/if}
    -->

    <Button isLoading={isEditing} type="submit" class="ml-auto">
      Save changes
    </Button>
  </form>
</Modal>
