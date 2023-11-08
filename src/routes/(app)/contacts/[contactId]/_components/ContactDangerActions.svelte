<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "$lib/ui/Button.svelte";
  import type { Contact } from "$lib/db/contact/getContacts";

  export let contact: Contact;

  let isDeleting = false;
</script>

<div class="flex flex-col gap-2 mt-auto sm:flex-row">
  <Button intent="dangerSecondary" fullWidth>
    <img src="/icons/block.svg" alt="Block user" class="w-4 h-4" />
    Block user
  </Button>

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
