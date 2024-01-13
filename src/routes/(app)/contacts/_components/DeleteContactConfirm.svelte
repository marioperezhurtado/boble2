<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { goto, invalidateAll } from "$app/navigation";
  import type { Contact } from "$lib/db/contact/getContacts";
  import Button from "$lib/ui/Button.svelte";
  import ButtonLink from "$lib/ui/ButtonLink.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import FormError from "$lib/ui/FormError.svelte";

  export let contact: Contact;

  let isDeleting = false;

  async function handleAddContact() {
    isDeleting = true;

    try {
      await trpc($page).contact.delete.mutate({
        contactId: contact.id,
      });
      await invalidateAll();
      goto("/contacts");
    } catch (error) {
      console.error(error);
    }

    isDeleting = false;
  }
</script>

<Modal title="Delete contact" backTo={$page.url.pathname}>
  <form on:submit|preventDefault={handleAddContact} class="flex flex-col gap-3">
    <p class="text-sm text-zinc-500">
      Are you sure you want to remove <strong>“{contact.alias}”</strong> from your
      contact list?
    </p>

    <!--
    {#if deleteError}
      <FormError message={deleteError} />
    {/if}
  -->

    <div class="flex gap-4 justify-end mt-5">
      <ButtonLink intent="secondary" href={$page.url.pathname}>
        Cancel
      </ButtonLink>
      <Button isLoading={isDeleting} type="submit" intent="danger">
        Delete contact
      </Button>
    </div>
  </form>
</Modal>
