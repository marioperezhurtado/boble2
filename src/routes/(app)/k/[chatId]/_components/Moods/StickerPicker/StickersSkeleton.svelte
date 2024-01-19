<script lang="ts">
  const NUM_COLUMNS = 4;

  const stickerSkeletons = [
    "square",
    "video",
    "video",
    "square",
    "video",
    "video",
    "square",
    "square",
    "portrait",
    "square",
    "square",
    "video",
    "video",
    "square",
    "video",
    "square",
  ] as const;
</script>

<div class="grid grid-cols-4 gap-2 h-full animate-pulse">
  {#each { length: NUM_COLUMNS } as _, column}
    <div class="flex flex-col gap-2">
      {#each stickerSkeletons as skeleton, i}
        {#if i % NUM_COLUMNS === column}
          <div
            class={`rounded-md border shadow-sm bg-zinc-100 flex-grow
            aspect-${skeleton === 'portrait' ? '[9/16]' : skeleton}`}
          />
        {/if}
      {/each}
    </div>
  {/each}
</div>
