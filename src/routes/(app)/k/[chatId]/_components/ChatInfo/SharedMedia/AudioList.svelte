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

          <p class="pr-2 text-sm font-medium text-zinc-600">
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
        <p class="mt-1 text-xs text-right">
          {formatDateShort(new Date(message.createdAt))}
        </p>
      </li>
    {/if}
  {/each}
</ul>
