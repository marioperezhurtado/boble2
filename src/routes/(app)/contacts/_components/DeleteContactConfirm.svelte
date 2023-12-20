<script lang="ts">
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import type { Contact } from "$lib/db/contact/getContacts";
  import Button from "$lib/ui/Button.svelte";
  import ButtonLink from "$lib/ui/ButtonLink.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import FormError from "$lib/ui/FormError.svelte";

  export let contact: Contact;

  let isDeleting = false;
</script>

<Modal title="Delete contact" backTo={$page.url.pathname}>
  <div class="flex flex-col gap-2 text-sm text-zinc-500">
    <p>
      Are you sure you want to remove <strong>“{contact.alias}”</strong> from
      your contact list?
    </p>
  </div>

  <form
    action="/contacts?/removeContact"
    use:enhance={() => {
      isDeleting = true;

      return async ({ update }) => {
        await update();
        isDeleting = false;
      };
    }}
    method="POST"
    class="flex flex-col gap-3 pt-10"
  >
    <input type="hidden" name="contactId" value={contact.id} />

    {#if $page.form?.error}
      <FormError message={$page.form.error} />
    {/if}

    <div class="flex gap-4 justify-end">
      <ButtonLink intent="secondary" href={$page.url.pathname}>
        Cancel
      </ButtonLink>
      <Button isLoading={isDeleting} type="submit" intent="danger">
        Delete contact
      </Button>
    </div>
  </form>
</Modal>
