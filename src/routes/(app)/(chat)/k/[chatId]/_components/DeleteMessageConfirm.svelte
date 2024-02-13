<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { goto } from "$app/navigation";
  import { removeMessage } from "$lib/socket/client";
  import type { Message } from "$lib/db/message/getMessages";
  import Button from "$lib/ui/Button.svelte";
  import ButtonLink from "$lib/ui/ButtonLink.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import FormError from "$lib/ui/FormError.svelte";
  import MessageOverview from "./MessageOverview.svelte";

  export let message: Message;

  const deleteMessage = trpc.message.delete.createMutation({
    onSuccess: () => goto($page.url.pathname),
  });

  function handleDeleteMessage() {
    $deleteMessage.mutateAsync({ messageId: message.id });
    removeMessage(message.id, $page.params.chatId);
  }

  $: error = $deleteMessage.error?.data?.error;
</script>

<Modal title="Delete message" backTo={$page.url.pathname}>
  <div class="flex flex-col gap-5 text-sm">
    <p class="text-zinc-500">Are you sure you want to delete this message?</p>
    <MessageOverview {message} isOwn />
  </div>

  <div class="flex flex-col gap-3 pt-5">
    {#if error}
      <FormError message={error} />
    {/if}

    <div class="flex gap-4 justify-end">
      <ButtonLink intent="secondary" href={$page.url.pathname}>
        Cancel
      </ButtonLink>
      <Button
        on:click={handleDeleteMessage}
        isLoading={$deleteMessage.isPending}
        type="submit"
        intent="danger"
      >
        Delete message
      </Button>
    </div>
  </div>
</Modal>
