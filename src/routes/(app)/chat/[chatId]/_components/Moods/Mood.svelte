<script lang="ts">
  import { selectedMood } from "./store";

  export let mood: typeof $selectedMood;
  export let icon: string;
</script>

<li>
  <button
    on:click={() => ($selectedMood = mood)}
    title={mood}
    class="py-1 px-6 border-r transition"
    class:bg-zinc-100={mood === $selectedMood}
  >
    <img
      src={icon}
      alt="Open {mood} picker"
      class="h-5 {$$restProps.class}"
    />
  </button>
</li>
