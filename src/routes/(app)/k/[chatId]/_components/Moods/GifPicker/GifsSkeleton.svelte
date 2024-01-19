<script lang="ts">
  const NUM_COLUMNS = 2;

  const gifSkeletons = ["video", "square", "square", "square", "auto"] as const;
</script>

<div class="grid grid-cols-2 gap-2 h-full animate-pulse">
  {#each { length: NUM_COLUMNS } as _, column}
    <div class="flex flex-col gap-2">
      {#each gifSkeletons as skeleton, i}
        {#if i % NUM_COLUMNS === column}
          <div
            class="rounded-md border shadow-sm aspect-{skeleton} bg-zinc-100 h-full"
          />
        {/if}
      {/each}
    </div>
  {/each}
</div>
