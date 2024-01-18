<script lang="ts">
  export let playbackRate: number;
  export let isOwn: boolean;

  const PLAYBACK_RATES = [1, 1.5, 2];

  function handleSpeedChange() {
    const index = PLAYBACK_RATES.indexOf(playbackRate);
    playbackRate = PLAYBACK_RATES[(index + 1) % PLAYBACK_RATES.length];
  }
</script>

<button
  on:click={handleSpeedChange}
  class={`rounded h-5 w-9 text-xs font-bold
    ${isOwn ? "bg-cyan-800 text-zinc-50" : "bg-zinc-200 text-zinc-500"}
  `}
>
  {playbackRate}x
</button>
