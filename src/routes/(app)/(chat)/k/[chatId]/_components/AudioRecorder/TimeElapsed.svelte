<script lang="ts">
  import { onMount } from "svelte";
  import { formatMinuteSeconds } from "$lib/utils/date";

  export let timeElapsed = 0;

  onMount(() => {
    const interval = setInterval(() => {
      timeElapsed += 1;
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<p class="font-mono text-zinc-500">
  {formatMinuteSeconds(timeElapsed)}
</p>
