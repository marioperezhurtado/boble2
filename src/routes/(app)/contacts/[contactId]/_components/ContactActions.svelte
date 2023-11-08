<script lang="ts">
  import { enhance } from "$app/forms";
  import Button from "$lib/ui/Button.svelte";
  import type { Contact } from "$lib/db/contact/getContacts";

  export let contact: Contact;

  let isOpeningChat = false;
</script>

<div class="flex flex-col gap-2 pb-8 sm:flex-row">
  <Button intent="secondary" size="small">
    <img src="/icons/edit.svg" alt="Edit contact" class="w-4 h-4" />
    Edit contact
  </Button>
  <form
    use:enhance={() => {
      isOpeningChat = true;

      return async ({ update }) => {
        await update();
        isOpeningChat = false;
      };
    }}
    action="?/openChat"
    method="POST"
    use:enhance
  >
    <Button
      isLoading={isOpeningChat}
      type="submit"
      intent="primary"
      size="small"
    >
      <img src="/icons/chat-light.svg" alt="Open chat" class="w-4 h-4" />
      Open chat
    </Button>
    <input type="hidden" name="contactId" value={contact.id} />
  </form>
</div>
