<script lang="ts">
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import type { Contact } from "$lib/db/contact/getContacts";
  import type { ActionData, SubmitFunction } from "../$types";
  import Button from "$lib/ui/Button.svelte";
  import ButtonLink from "$lib/ui/ButtonLink.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import FormError from "$lib/ui/FormError.svelte";

  export let contact: Contact;

  let isDeleting = false;
  let deleteError: string | null = null;

  const handleEnhance: SubmitFunction = () => {
    isDeleting = true;

    return async ({ update, result }) => {
      await update();
      isDeleting = false;

      if (result.type === "failure") {
        deleteError = (result.data as ActionData)?.error ?? null;
        return;
      }
    };
  };
</script>

<Modal title="Delete contact" backTo={$page.url.pathname}>
  <form
    method="POST"
    action="/contacts?/removeContact"
    use:enhance={handleEnhance}
    class="flex flex-col gap-3"
  >
    <input type="hidden" name="contactId" value={contact.id} />

    <p class="text-sm text-zinc-500">
      Are you sure you want to remove <strong>“{contact.alias}”</strong> from your
      contact list?
    </p>

    {#if deleteError}
      <FormError message={deleteError} />
    {/if}

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
