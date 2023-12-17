<script lang="ts">
  import Bubbles from "./Bubbles.svelte";
  import ButtonLink from "$lib/ui/ButtonLink.svelte";
</script>

<div class="flex gap-5 px-8 pt-16 mx-auto max-w-screen-lg sm:pt-20">
  <Bubbles />
  <div class="pt-2">
    <h1 class="text-3xl font-black tracking-wide">BOBLE</h1>
    <p class="pt-2 text-xl font-medium sm:text-2xl text-zinc-500">Real-time web chat.</p>
    <div class="pt-4">
      <ButtonLink href="/chat">Start chatting</ButtonLink>
    </div>
  </div>
</div>
