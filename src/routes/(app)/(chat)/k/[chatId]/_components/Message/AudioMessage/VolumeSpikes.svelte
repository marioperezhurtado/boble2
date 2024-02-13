<script lang="ts">
  import VolumeSpike from "./VolumeSpike.svelte";

  export let volumeSpikes: string[];
  export let currentTime: number;
  export let isOwn: boolean;
  export let audioDuration: number;
  export let disabled: boolean = false;
</script>

<div class="flex relative justify-between items-center w-52 h-8">
  {#each volumeSpikes as spike, i}
    <VolumeSpike
      {spike}
      {isOwn}
      isRead={i / volumeSpikes.length < currentTime / audioDuration}
    />
  {/each}
  {#if !disabled}
    <input
      type="range"
      bind:value={currentTime}
      min="0"
      max={audioDuration}
      step="0.05"
      class="absolute top-1/2 w-52 h-10 bg-transparent bg-red-500 -translate-y-1/2 appearance-none -left-[5px]"
    />
  {/if}
</div>

<style>
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 12px;
    width: 12px;
    background-color: #06b6d4;
    border-radius: 50%;
    border: none;
    cursor: pointer;
  }
  input[type="range"]::-moz-range-thumb {
    height: 12px;
    width: 12px;
    background-color: #06b6d4;
    border-radius: 50%;
    border: none;
    cursor: pointer;
  }
</style>
