<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { goto } from "$app/navigation";
  import type { Contact } from "$lib/db/contact/getContacts";
  import Button from "$lib/ui/Button.svelte";
  import ButtonLink from "$lib/ui/ButtonLink.svelte";

  export let contact: Contact;

  const openChat = trpc.chat.open.createMutation({
    onSuccess: async (chatId) => goto(`/k/${chatId}`),
  });

  function handleOpenChat() {
    $openChat.mutate({ userId: contact.id });
  }
</script>

<div class="flex flex-row flex-wrap gap-2">
  <ButtonLink
    href={$page.url.pathname + "?editContact=" + contact.id}
    intent="secondary"
  >
    <img src="/icons/edit.svg" alt="Edit contact" class="w-4 h-4" />
    Edit contact
  </ButtonLink>

  <Button
    on:click={handleOpenChat}
    isLoading={$openChat.isPending}
    intent="primary"
  >
    <img src="/icons/chat-light.svg" alt="Open chat" class="w-4 h-4" />
    Open chat
  </Button>
</div>
