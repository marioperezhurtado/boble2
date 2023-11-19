<script lang="ts">
  import { enhance } from "$app/forms";
  import { tick } from "svelte";
  import EmojiPicker from "./EmojiPicker/EmojiPicker.svelte";
  import GifPicker from "./GifPicker/GifPicker.svelte";

  let text = "";
  let messageType: "text" | "image" | "gif" = "text";
  let textInput: HTMLInputElement | undefined = undefined;
  let form: HTMLFormElement | undefined = undefined;

  function handlePickEmoji(emoji: string) {
    text += emoji;
    textInput?.focus();
  }

  async function handlePickGif(gif: string) {
    if (!textInput || !form) return;

    text = gif;
    messageType = "gif";
    await tick();

    form.requestSubmit();
    messageType = "text";
  }
</script>

<form
  action="?/sendMessage"
  method="post"
  use:enhance
  bind:this={form}
  class="flex gap-2.5 items-center p-2 px-3 border-t bg-zinc-50"
>
  <input type="hidden" name="messageType" value={messageType} />
  <EmojiPicker onPick={handlePickEmoji} />
  <GifPicker onPick={handlePickGif} />
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
      <img src="/icons/send.svg" alt="Send message" class="w-6 h-6" />
    </button>
  {:else}
    <button
      type="button"
      title="Record audio"
      aria-label="Record audio"
      class="p-0.5 rounded-md min-w-fit focus:outline-cyan-600"
    >
      <img src="/icons/microphone.svg" alt="Record audio" class="w-6 h-6" />
    </button>
  {/if}
</form>
