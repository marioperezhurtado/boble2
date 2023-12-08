<script lang="ts">
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import type { Chat } from "$lib/db/chat/getChats";
  import Button from "$lib/ui/Button.svelte";
  import ButtonLink from "$lib/ui/ButtonLink.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import FormError from "$lib/ui/FormError.svelte";

  export let chat: Chat;

  let isDeleting = false;
</script>

<Modal backTo={$page.url.pathname}>
  <h1 class="pb-3 text-xl font-bold">Delete chat</h1>
  <div class="flex flex-col gap-2 text-sm text-zinc-500">
    <p>Are you sure you want to delete this chat?</p>
    <p>
      All messages will be <strong>permanently</strong> deleted.
    </p>
  </div>

  <form
    action="/chat?/deleteChat"
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
    <input type="hidden" name="chatId" value={chat.id} />

    {#if $page.form?.error}
      <FormError message={$page.form.error} />
    {/if}

    <div class="flex gap-4 justify-end">
      <ButtonLink intent="secondary" href={$page.url.pathname}>
        Cancel
      </ButtonLink>
      <Button isLoading={isDeleting} type="submit" intent="danger">
        Delete chat
      </Button>
    </div>
  </form>
</Modal>
