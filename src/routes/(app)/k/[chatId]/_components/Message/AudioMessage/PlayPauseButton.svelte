<script lang="ts">
  export let isPaused: boolean;
  export let isOwn: boolean;
</script>

<button
  on:click={() => (isPaused = !isPaused)}
  class="flex justify-center items-center h-10 rounded-full min-w-10"
  class:bg-cyan-900={isOwn}
  class:bg-zinc-200={!isOwn}
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
