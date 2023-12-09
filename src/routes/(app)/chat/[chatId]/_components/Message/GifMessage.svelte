<script lang="ts">
  import { formatTime } from "$lib/utils/date";
  import type { Message } from "$lib/db/message/getMessages";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;

  const isRead = lastReadAt >= message.createdAt!;
  const createdAt = new Date(message.createdAt!);

  let videoGif: HTMLVideoElement | undefined;
  let isPaused = false;

  $: if (isPaused) {
    videoGif?.removeAttribute("loop");
    videoGif?.pause();
  } else {
    videoGif?.setAttribute("loop", "");
    videoGif?.play();
    setTimeout(() => {
      isPaused = true;
    }, 5000);
  }
</script>

<div class="max-w-[18rem]">
  <div class="overflow-hidden relative rounded-md">
    <div
      class="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t to-transparent from-black/40"
    />
    <video
      on:click={() => (isPaused = !isPaused)}
      bind:this={videoGif}
      muted
      loop
      autoplay
      playsinline
      class="cursor-pointer bg-zinc-100"
    >
      <source src={message.text} type="video/mp4" />
    </video>
    {#if isPaused}
      <div
        class="flex absolute top-1/2 left-1/2 justify-center items-center w-12 h-12 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-black/20"
      >
        <img src="/icons/gif-light.svg" alt="GIF" class="w-5 h-5" />
      </div>
    {/if}
    <p
      class="flex absolute right-1 bottom-1 gap-0.5 items-end leading-3 text-right text-white text-[10px] min-w-fit"
    >
      {formatTime(createdAt)}
      {#if isOwn}
        {#if isRead}
          <img
            src="/icons/double-check.svg"
            alt="Read"
            title="Read"
            class="-mb-0.5 w-4 h-4"
          />
        {:else}
          <img
            src="/icons/check.svg"
            alt="Sent"
            title="Sent"
            class="-mb-0.5 w-4 h-4"
          />
        {/if}
      {/if}
    </p>
  </div>
</div>
