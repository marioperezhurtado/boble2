<script lang="ts">
  import { onMount } from "svelte";

  let timeElapsed = 0;

  onMount(() => {
    const interval = setInterval(() => {
      timeElapsed += 1;
    }, 1000);

    return () => clearInterval(interval);
  });
</script>

<p class="font-mono text-zinc-500 font-semibold text-lg">
  {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, "0")}
</p>
