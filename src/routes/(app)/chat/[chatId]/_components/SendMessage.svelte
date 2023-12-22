<script lang="ts">
  import { enhance } from "$app/forms";
  import { replyingTo } from "./stores";
  import Attachments from "./Attachments/Attachments.svelte";
  import Moods from "./Moods/Moods.svelte";

  let text = "";

  let textInput: HTMLInputElement | undefined = undefined;

  $: if ($replyingTo) textInput?.focus();
</script>

<div class="flex gap-2.5 items-center">
  <Moods />
  <Attachments />

  <form
    action="?/sendTextMessage"
    method="post"
    use:enhance={() => {
      return async ({ update }) => {
        await update();
        $replyingTo = null;
      };
    }}
    class="flex flex-1 gap-2.5 items-center"
  >
    <input type="hidden" name="replyToId" value={$replyingTo?.id ?? null} />

    <label for="message" class="sr-only">Message</label>
    <input
      bind:value={text}
      bind:this={textInput}
      id="message"
      name="message"
      type="text"
      placeholder="Type a message"
      class="block py-1.5 px-2 ml-1 w-full rounded-md border shadow-sm placeholder:text-zinc-400 focus:outline-cyan-600"
      autocomplete="off"
    />
    {#if text.length}
      <button
        type="submit"
        title="Send message"
        aria-label="Send message"
        class="p-0.5 rounded-md min-w-fit focus:outline-cyan-600"
      >
        <img src="/icons/send.svg" alt="Send message" class="w-7 h-7" />
      </button>
    {:else}
      <button
        type="button"
        title="Record audio"
        aria-label="Record audio"
        class="p-0.5 rounded-md min-w-fit focus:outline-cyan-600"
      >
        <img src="/icons/microphone.svg" alt="Record audio" class="h-7" />
      </button>
    {/if}
  </form>
</div>
