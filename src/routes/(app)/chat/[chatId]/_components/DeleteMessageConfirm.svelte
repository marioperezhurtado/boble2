<script lang="ts">
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import type { Message } from "$lib/db/message/getMessages";
  import Button from "$lib/ui/Button.svelte";
  import ButtonLink from "$lib/ui/ButtonLink.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import FormError from "$lib/ui/FormError.svelte";

  export let message: Message;

  let isDeleting = false;
</script>

<Modal backTo={$page.url.pathname}>
  <h1 class="pb-3 text-xl font-bold">Delete message</h1>
  <div class="flex flex-col gap-5 text-sm">
    <p class="text-zinc-500">Are you sure you want to delete this message?</p>
    <div
      class="px-2.5 py-1.5 rounded text-xs border-l-4 w-full bg-cyan-600/10 border-cyan-600"
    >
      <p class="font-semibold">You</p>
      <p class="break-all">{message.text}</p>
    </div>
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
