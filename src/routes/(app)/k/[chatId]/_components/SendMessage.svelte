<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { text, replyingTo } from "$lib/stores/store";
  import { encryptMessageField } from "$lib/utils/encryption";
  import { sendMessage } from "$lib/socket/client";
  import Attachments from "./Attachments/Attachments.svelte";
  import Moods from "./Moods/Moods.svelte";

  export let onStartRecording: () => void;

  let textInput: HTMLInputElement | undefined = undefined;

  $: if ($replyingTo) textInput?.focus();

  function onSuccess() {
    $replyingTo = null;
    $text = "";
  }

  const sendTextMessage = trpc.message.sendText.createMutation({
    onSuccess,
  });

  const sendLinkMessage = trpc.message.sendLink.createMutation({
    onSuccess,
  });

  const generateLinkPreview = trpc.message.generateLinkPreview.createMutation();

  async function handleSendMessage() {
    if (!$text) return;

    const encryptedText = await encryptMessageField($text, $page.params.chatId);

    const url = $text.match(/(https?:\/\/[^\s]+)/)?.[0] ?? "";

    // Text message
    if (!url) {
      const newMessage = await $sendTextMessage.mutateAsync({
        text: encryptedText,
        chatId: $page.params.chatId,
        replyToId: $replyingTo?.id,
      });

      sendMessage({
        ...newMessage,
        createdAt: new Date(newMessage.createdAt),
        imageInfo: null,
        videoInfo: null,
        documentInfo: null,
        linkPreview: null,
        audioInfo: null,
      });
      return;
    }

    // Link message
    const linkPreview = await $generateLinkPreview.mutateAsync(url);

    const [
      encryptedUrl,
      encryptedTitle,
      encryptedDescription,
      encryptedImage,
      encryptedSiteName,
    ] = await Promise.all([
      encryptMessageField(url, $page.params.chatId),
      encryptMessageField(linkPreview.title, $page.params.chatId),
      encryptMessageField(linkPreview.description, $page.params.chatId),
      encryptMessageField(linkPreview.image, $page.params.chatId),
      encryptMessageField(linkPreview.siteName, $page.params.chatId),
    ]);

    const newMessage = await $sendLinkMessage.mutateAsync({
      text: encryptedText,
      chatId: $page.params.chatId,
      replyToId: $replyingTo?.id,
      url: encryptedUrl,
      linkPreview: {
        title: encryptedTitle,
        description: encryptedDescription,
        image: encryptedImage,
        siteName: encryptedSiteName,
      },
    });

    sendMessage({
      ...newMessage,
      createdAt: new Date(newMessage.createdAt),
      imageInfo: null,
      videoInfo: null,
      documentInfo: null,
      linkPreview: null,
      audioInfo: null,
    });
  }
</script>

<div class="flex gap-1.5 items-center h-14 sm:gap-2.5">
  <Moods />
  <Attachments />

  <form
    on:submit|preventDefault={handleSendMessage}
    class="flex flex-1 gap-1.5 items-center sm:gap-2.5"
  >
    <label for="message" class="sr-only">Message</label>
    <input
      bind:value={$text}
      bind:this={textInput}
      id="message"
      name="message"
      type="text"
      placeholder="Type a message"
      class="block py-1.5 px-2 ml-1 w-full rounded-md border shadow-sm placeholder:text-zinc-400 focus:outline-cyan-600"
      autocomplete="off"
    />
    {#if $text.length}
      <button
        type="submit"
        title="Send message"
        aria-label="Send message"
        class="p-0.5 rounded-md min-w-fit focus:outline-cyan-600"
      >
        <img src="/icons/send.svg" alt="Send message" class="w-7 h-7" />
      </button>
    {/if}
  </form>

  {#if !$text.length}
    <button
      on:click={onStartRecording}
      type="button"
      title="Record audio"
      aria-label="Record audio"
      class="p-0.5 rounded-md min-w-fit focus:outline-cyan-600"
    >
      <img src="/icons/microphone.svg" alt="Record audio" class="w-7 h-7" />
    </button>
  {/if}
</div>
