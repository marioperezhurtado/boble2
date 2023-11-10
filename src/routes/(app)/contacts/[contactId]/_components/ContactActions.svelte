<script lang="ts">
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import Button from "$lib/ui/Button.svelte";
  import ButtonLink from "$lib/ui/ButtonLink.svelte";
  import type { Contact } from "$lib/db/contact/getContacts";

  export let contact: Contact;

  let isOpeningChat = false;
</script>

<div class="flex flex-col gap-2 pb-8 sm:flex-row">
  <ButtonLink
    href={$page.url.pathname + "?edit"}
    intent="secondary"
    size="small"
  >
    <img src="/icons/edit.svg" alt="Edit contact" class="w-4 h-4" />
    Edit contact
  </ButtonLink>

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
