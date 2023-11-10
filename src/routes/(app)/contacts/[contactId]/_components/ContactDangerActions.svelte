<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "$lib/ui/Button.svelte";
  import type { Contact } from "$lib/db/contact/getContacts";
  import BlockUnblockButton from "$lib/ui/BlockUnblockButton.svelte";

  export let contact: Contact;

  let isDeleting = false;
</script>

<div class="flex flex-col gap-2 mt-auto sm:flex-row">
  <BlockUnblockButton userId={contact.id} isBlocked={!!contact.isBlocked} />

  <form
    use:enhance={() => {
      isDeleting = true;

      return async ({ update }) => {
        await update();
        isDeleting = false;
      };
    }}
    action="?/removeContact"
    method="POST"
    class="w-full"
  >
    <Button isLoading={isDeleting} type="submit" intent="danger" fullWidth>
      <img src="/icons/delete.svg" alt="Delete contact" class="w-4 h-4" />
      Delete contact
    </Button>
    <input type="hidden" name="contactId" value={contact.id} />
  </form>
</div>
