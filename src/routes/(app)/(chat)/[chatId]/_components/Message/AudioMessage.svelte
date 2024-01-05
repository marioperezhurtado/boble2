<script lang="ts">
  import { formatMinuteSeconds } from "$lib/utils/date";
  import { capitalize } from "$lib/utils/text";
  import { getFileUrl } from "$lib/utils/url";
  import type { Message } from "$lib/db/message/getMessages";
  import MessageBubble from "./MessageBubble.svelte";
  import MessageStatus from "./MessageStatus.svelte";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;
  export let isFirst: boolean;

  let isPaused = true;
  let currentTime = 0;
  let audio: HTMLAudioElement;

  const audioDuration = message.audioInfo?.duration || 0;

  const volumeSpikes = new Array(50)
    .fill(0)
    .map(() => Math.max(0.1, Math.random()));

  function handlePlayPause() {
    isPaused ? audio.play() : audio.pause();
  }
</script>

<audio
  bind:this={audio}
  bind:currentTime
  bind:paused={isPaused}
  src={getFileUrl(message.audioInfo?.url ?? "")}
  hidden
/>

<MessageBubble {message} {isOwn} {isFirst}>
  <div class="w-64">
    <div class="flex gap-2.5 items-center p-0.5">
      <button
        on:click={handlePlayPause}
        class="flex justify-center items-center w-10 h-10 rounded-full"
        class:bg-cyan-900={isOwn}
        class:bg-zinc-300={!isOwn}
      >
        <img
          src={isPaused
            ? isOwn
              ? "/icons/play-light.svg"
              : "/icons/play.svg"
            : isOwn
              ? "/icons/pause-light.svg"
              : "/icons/pause.svg"}
          alt={isPaused ? "Play" : "Pause"}
          class="w-5 h-5"
          class:-mr-0.5={isPaused}
        />
      </button>

      {#if message.audioInfo}
        <div class="flex gap-0.5 items-center h-10">
          {#each message.audioInfo.volumeSpikes.split(",") as spike, i}
            <div
              class="w-0.5 rounded-full"
              class:bg-cyan-900={isOwn}
              class:bg-zinc-300={!isOwn}
              class:bg-white={i / volumeSpikes.length <
                currentTime / audioDuration && isOwn}
              class:bg-zinc-500={i / volumeSpikes.length <
                currentTime / audioDuration && !isOwn}
              style="height: {Math.max(10, Number(spike) * 10)}%"
            />
          {/each}
        </div>
      {/if}
    </div>

    {#if message.audioInfo?.transcript}
      <p class="p-1">{capitalize(message.audioInfo.transcript)}</p>
    {/if}

    <div class="flex justify-between items-center">
      <p class="pt-1 pl-1 font-mono text-xs leading-3">
        {#if currentTime > 0}
          {formatMinuteSeconds(currentTime)} /{" "}
        {/if}
        {formatMinuteSeconds(audioDuration)}
      </p>

      <MessageStatus {message} {lastReadAt} {isOwn} />
    </div>
  </div>
</MessageBubble>
