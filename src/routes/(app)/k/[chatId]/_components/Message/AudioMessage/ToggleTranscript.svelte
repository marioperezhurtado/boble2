<script lang="ts">
  export let showTranscript: boolean;
  export let isOwn: boolean;
</script>

<button
  on:click={() => (showTranscript = !showTranscript)}
  class={`rounded h-5 w-9 ${isOwn ? "bg-cyan-800" : "bg-zinc-200"}`}
>
  <img
    src={showTranscript
      ? isOwn
        ? "/icons/transcript-off-light.svg"
        : "/icons/transcript-off.svg"
      : isOwn
        ? "/icons/transcript-light.svg"
        : "/icons/transcript.svg"}
    alt="Transcript"
    class="mx-auto h-[18px]"
  />
</button>
