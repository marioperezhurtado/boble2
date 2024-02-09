<script lang="ts">
  export let text: string;
  export let isFulfilled: boolean;
</script>

<li
  class={`flex items-center gap-3
    ${isFulfilled ? "text-green-600" : "text-zinc-500"}
  `}
>
  <span>
    {#if isFulfilled}
      ✔
    {:else}
      ✗
    {/if}
  </span>
  {text}
</li>
