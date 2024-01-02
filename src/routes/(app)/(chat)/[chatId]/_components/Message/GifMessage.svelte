<script lang="ts">
  import type { Message } from "$lib/db/message/getMessages";
  import MessageBubble from "./MessageBubble.svelte";
  import MessageStatus from "./MessageStatus.svelte";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;
  export let isFirst: boolean;
  export let brokenFile = false;

  let videoGif: HTMLVideoElement | undefined;
  let isPaused = false;

  $: if (!isPaused) {
    setTimeout(() => handlePlayPause(), 5000);
  }

  function handlePlayPause() {
    if (brokenFile) return;

    if (isPaused) {
      videoGif?.play();
      isPaused = false;
    } else {
      videoGif?.pause();
      isPaused = true;
    }
  }
</script>

<MessageBubble {message} {isOwn} {isFirst}>
  <div class="overflow-hidden relative rounded-md max-w-[18rem]">
    <div
      class="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t to-transparent from-black/40"
    />
    <video
      on:click={handlePlayPause}
      on:error={() => (brokenFile = true)}
      bind:this={videoGif}
      muted
      loop
      autoplay
      playsinline
      src={message.text}
      class="cursor-pointer bg-zinc-100"
    >
      <source
        on:error={() => (brokenFile = true)}
        src={message.text}
        type="video/mp4"
      />
    </video>

    {#if isPaused}
      <div
        class="flex absolute top-1/2 left-1/2 justify-center items-center w-12 h-12 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-black/20"
      >
        <img src="/icons/gif-letters-light.svg" alt="GIF" class="w-5 h-5" />
      </div>
    {/if}

    <div class="absolute right-1 bottom-1">
      <MessageStatus {message} {lastReadAt} {isOwn} />
    </div>

    {#if !brokenFile}
      <img
        src="/giphy-attribution.png"
        alt="Powered by GIPHY"
        class="absolute bottom-1 left-1 w-12"
      />
    {/if}
  </div>
</MessageBubble>
