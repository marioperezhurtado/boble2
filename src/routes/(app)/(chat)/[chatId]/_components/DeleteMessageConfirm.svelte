<script lang="ts">
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import type { Message } from "$lib/db/message/getMessages";
  import Button from "$lib/ui/Button.svelte";
  import ButtonLink from "$lib/ui/ButtonLink.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import FormError from "$lib/ui/FormError.svelte";
  import MessageOverview from "./MessageOverview.svelte";

  export let message: Message;

  let isDeleting = false;
</script>

<Modal title="Delete message" backTo={$page.url.pathname}>
  <div class="flex flex-col gap-5 text-sm">
    <p class="text-zinc-500">Are you sure you want to delete this message?</p>
    <MessageOverview {message} isOwn />
  </div>

  <form
    action="?/deleteMessage"
    use:enhance={() => {
      isDeleting = true;

      return async ({ update }) => {
        await update();
        isDeleting = false;
      };
    }}
    method="POST"
    class="flex flex-col gap-3 pt-5"
  >
    <input type="hidden" name="messageId" value={message.id} />

    {#if $page.form?.error}
      <FormError message={$page.form.error} />
    {/if}

    <div class="flex gap-4 justify-end">
      <ButtonLink intent="secondary" href={$page.url.pathname}>
        Cancel
      </ButtonLink>
      <Button isLoading={isDeleting} type="submit" intent="danger">
        Delete message
      </Button>
    </div>
  </form>
</Modal>
