<script lang="ts">
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import type { Chat } from "$lib/db/chat/getChats";
  import type { SubmitFunction, ActionData } from "../$types";
  import Button from "$lib/ui/Button.svelte";
  import ButtonLink from "$lib/ui/ButtonLink.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import FormError from "$lib/ui/FormError.svelte";

  export let chat: Chat;

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

<Modal title="Delete chat" backTo={$page.url.pathname}>
  <form
    method="POST"
    action="/?/deleteChat"
    use:enhance={handleEnhance}
    class="flex flex-col gap-3"
  >
    <input type="hidden" name="chatId" value={chat.id} />

    <div class="flex flex-col gap-2 text-sm text-zinc-500">
      <p>Are you sure you want to delete this chat?</p>
      <p>
        All messages will be <strong>permanently</strong> deleted.
      </p>
    </div>

    {#if deleteError}
      <FormError message={deleteError} />
    {/if}

    <div class="flex gap-4 justify-end mt-5">
      <ButtonLink intent="secondary" href={$page.url.pathname}>
        Cancel
      </ButtonLink>
      <Button isLoading={isDeleting} type="submit" intent="danger">
        Delete chat
      </Button>
    </div>
  </form>
</Modal>
