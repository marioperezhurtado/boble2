<script lang="ts">
  import { onMount } from "svelte";
  import { VOLUME_SPIKE_COUNT } from "./volumeSpikes";

  export let stream: MediaStream;
  export let volumeSpikes: number[];

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

      volume = Math.sqrt(sumSquares / pcmData.length) * 80;
      window.requestAnimationFrame(onFrame);
    };

    window.requestAnimationFrame(onFrame);

    const volumeUpdateInterval = setInterval(() => {
      volumeSpikes = [...volumeSpikes, volume];
    }, 100);

    return () => {
      mediaStreamAudioSourceNode.disconnect();
      analyserNode.disconnect();
      clearInterval(volumeUpdateInterval);
    };
  });
</script>

<div class="flex relative gap-0.5 items-center h-10">
  {#each volumeSpikes.slice(-VOLUME_SPIKE_COUNT) as spike}
    <div
      class="w-0.5 rounded-full bg-zinc-400"
      style="height: {Math.min(Math.max(Number(spike) * 10, 5), 100)}%"
    />
  {/each}

  <div
    class="absolute right-0 w-5 h-14 bg-gradient-to-r from-transparent to-zinc-50"
  />
  <div
    class="absolute left-0 w-5 h-14 bg-gradient-to-l from-transparent to-zinc-50"
  />
</div>
