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

  let alias = contact.alias;

  const editContact = trpc($page).contact.edit.createMutation({
    retry: false,
    onSuccess: async () => {
      await invalidateAll();
      goto(`/contacts/${contact.id}`);
    },
  });

  function handleEditContact() {
    $editContact.mutate({
      contactId: contact.id,
      alias,
    });
  }

  $: validationErrors = $editContact.error?.data?.validationErrors;
  $: error = $editContact.error?.data?.error;
</script>

<Modal title="Edit contact" backTo={$page.url.pathname}>
  <p class="text-sm text-zinc-500">Modify the details of your contact.</p>

  <form
    on:submit|preventDefault={handleEditContact}
    class="flex flex-col gap-6 pt-8"
  >
    <div>
      <Label for="alias">
        Alias
        <Input
          bind:value={alias}
          name="alias"
          type="text"
          info="This is the name that will appear in your contact list."
          errors={validationErrors?.alias}
        />
      </Label>
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

    {#if error}
      <FormError message={error} />
    {/if}

    <Button isLoading={$editContact.isPending} type="submit" class="ml-auto">
      Save changes
    </Button>
  </form>
</Modal>
