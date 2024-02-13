<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { goto, invalidateAll } from "$app/navigation";
  import type { Chat } from "$lib/db/chat/getChats";
  import Button from "$lib/ui/Button.svelte";
  import ButtonLink from "$lib/ui/ButtonLink.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import FormError from "$lib/ui/FormError.svelte";

  export let chat: Chat;

  const deleteChat = trpc.chat.delete.createMutation({
    onSuccess: async () => {
      await invalidateAll();

      if ($page.params.chatId === chat.id) {
        goto("/k");
      }
    },
  });

  function handleDeleteChat() {
    $deleteChat.mutate({ chatId: chat.id });
  }

  $: error = $deleteChat.error?.data?.error;
</script>

<Modal title="Delete chat" backTo={$page.url.pathname}>
  <div class="flex flex-col gap-3">
    <div class="flex flex-col gap-2 text-sm text-zinc-500">
      <p>Are you sure you want to delete this chat?</p>
      <p>
        All messages will be <strong>permanently</strong> deleted.
      </p>
    </div>

    {#if error}
      <FormError message={error} />
    {/if}

    <div class="flex gap-4 justify-end mt-5">
      <ButtonLink intent="secondary" href={$page.url.pathname}>
        Cancel
      </ButtonLink>
      <Button
        on:click={handleDeleteChat}
        isLoading={$deleteChat.isPending}
        type="submit"
        intent="danger"
      >
        Delete chat
      </Button>
    </div>
  </div>
</Modal>
