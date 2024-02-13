<script lang="ts">
  export let spike: string;
  export let isOwn: boolean;
  export let isRead: boolean;
</script>

<div
  class="w-0.5 rounded-full"
  class:bg-cyan-900={isOwn}
  class:bg-zinc-300={!isOwn}
  class:bg-zinc-50={isRead && isOwn}
  class:bg-zinc-400={isRead && !isOwn}
  style="height: {Math.min(Math.max(Number(spike) * 10, 6), 100)}%"
/>
