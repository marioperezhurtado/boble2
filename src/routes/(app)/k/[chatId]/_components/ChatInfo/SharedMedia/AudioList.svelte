<script lang="ts">
  import { formatDateShort, formatMinuteSeconds } from "$lib/utils/date";
  import VolumeSpikes from "../../Message/AudioMessage/VolumeSpikes.svelte";
  import type { RouterOutputs } from "$lib/trpc/trpc";

  type Message = RouterOutputs["message"]["getMediaMessages"][number];

  export let messages: Message[];
</script>

<ul class="flex flex-col gap-4 py-4 pr-3 pl-2.5">
  {#each messages as message}
    {#if message.audioInfo}
      <li>
        <div class="flex gap-3 items-center">
          <img
            src="/icons/microphone.svg"
            alt="Voice message icon"
            class="w-6 h-6"
          />

          <p class="text-sm text-zinc-600 pr-2 font-medium">
            {formatMinuteSeconds(message.audioInfo.duration)}
          </p>

          <VolumeSpikes
            volumeSpikes={message.audioInfo.volumeSpikes.split(",")}
            audioDuration={message.audioInfo.duration}
            currentTime={0}
            isOwn={false}
            disabled
          />
        </div>
        <p class="text-xs text-right mt-1">
          {formatDateShort(new Date(message.createdAt))}
        </p>
      </li>
    {/if}
  {/each}
</ul>
