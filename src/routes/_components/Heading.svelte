<script lang="ts">
  import Bubbles from "./Bubbles.svelte";
  import ButtonLink from "$lib/ui/ButtonLink.svelte";
</script>

<div class="flex gap-4 px-8 pt-20 mx-auto max-w-screen-lg">
  <Bubbles />
  <div class="pt-2">
    <h1 class="text-3xl font-black tracking-wide">BOBLE</h1>
    <p class="pt-2 text-2xl font-medium text-zinc-500">Real-time web chat.</p>
    <div class="flex gap-2 pt-5">
      <ButtonLink href="/chat">Start chatting</ButtonLink>
      <ButtonLink
        href="https://github.com/marioperezhurtado/boble2"
        target="_blank"
        rel="noopener noreferrer"
        intent="secondary"
      >
        About this project
      </ButtonLink>
    </div>
  </div>
</div>
