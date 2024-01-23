<script lang="ts">
  import { formatMinuteSeconds } from "$lib/utils/date";
  import { capitalize } from "$lib/utils/text";
  import { getFileUrl } from "$lib/utils/url";
  import type { Message } from "$lib/db/message/getMessages";
  import MessageBubble from "../MessageBubble.svelte";
  import MessageStatus from "../MessageStatus.svelte";
  import PlayPauseButton from "./PlayPauseButton.svelte";
  import VolumeSpikes from "./VolumeSpikes.svelte";
  import ChangePlaybackRate from "./ChangePlaybackRate.svelte";
  import ToggleTranscript from "./ToggleTranscript.svelte";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;
  export let isFirst: boolean;

  let isPaused = true;
  let currentTime = 0;
  let playbackRate = 1;
  let showTranscript = false;

  const audioDuration = message.audioInfo?.duration || 0;
</script>

<audio
  bind:currentTime
  bind:paused={isPaused}
  bind:playbackRate
  on:ended={() => (currentTime = 0)}
  src={getFileUrl(message.source ?? "")}
  hidden
/>

<MessageBubble {message} {isOwn} {isFirst}>
  <div class="w-64">
    <div class="flex gap-2.5 items-center p-0.5 pr-1">
      <PlayPauseButton bind:isPaused {isOwn} />

      {#if message.audioInfo}
        <VolumeSpikes
          volumeSpikes={message.audioInfo.volumeSpikes.split(",")}
          bind:currentTime
          {isOwn}
          {audioDuration}
        />
      {/if}
    </div>

    {#if showTranscript && message.text}
      <i class="p-1 pb-0.5">“{capitalize(message.text)}.”</i>
    {/if}

    <div class="flex justify-between items-end pl-1 mt-1 h-5">
      <div class="flex gap-1.5 items-center h-5">
        {#if currentTime !== 0}
          <ChangePlaybackRate bind:playbackRate {isOwn} />
        {/if}

        {#if message.audioInfo?.transcript}
          <ToggleTranscript bind:showTranscript {isOwn} />
        {/if}

        <p class="pl-0.5 h-3 font-mono text-xs">
          {#if currentTime === 0}
            {formatMinuteSeconds(audioDuration)}
          {:else}
            {formatMinuteSeconds(currentTime)}
          {/if}
        </p>
      </div>

      <MessageStatus {message} {lastReadAt} {isOwn} />
    </div>
  </div>
</MessageBubble>
