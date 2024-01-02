<script lang="ts">
  import { onMount } from "svelte";

  export let stream: MediaStream;

  let volumeSpikes = new Array(50).fill(0);
  let volume = 0;

  onMount(() => {
    const audioContext = new AudioContext();
    const mediaStreamAudioSourceNode =
      audioContext.createMediaStreamSource(stream);
    const analyserNode = audioContext.createAnalyser();
    mediaStreamAudioSourceNode.connect(analyserNode);

    const pcmData = new Float32Array(analyserNode.fftSize);
    const onFrame = () => {
      analyserNode.getFloatTimeDomainData(pcmData);
      let sumSquares = 0.0;

      for (const amplitude of pcmData) {
        sumSquares += amplitude * amplitude;
      }

      volume = Math.sqrt(sumSquares / pcmData.length) * 3 + 0.05;
      window.requestAnimationFrame(onFrame);
    };

    window.requestAnimationFrame(onFrame);

    setInterval(() => {
      volumeSpikes = [...volumeSpikes.slice(1), Math.min(1, volume)];
    }, 100);
  });
</script>

<div class="flex relative gap-0.5 items-center h-full">
  {#each volumeSpikes as spike}
    <div
      class="w-0.5 rounded-full bg-zinc-400"
      style="height: calc(100% * {spike});"
    />
  {/each}

  <div
    class="absolute right-0 w-5 h-14 bg-gradient-to-r from-transparent to-zinc-50"
  />
  <div
    class="absolute left-0 w-5 h-14 bg-gradient-to-l from-transparent to-zinc-50"
  />
</div>
