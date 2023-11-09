<script lang="ts">
  import Highlighted from "$lib/ui/Highlighted.svelte";
  import DeviceShowcase from "./DeviceShowcase.svelte";
</script>

<section class="flex gap-10 justify-between items-start px-8 pt-52 mx-auto max-w-screen-lg">
  <div>
    <h2 class="max-w-md text-4xl font-extrabold leading-snug">
      Chat with your friends
      <Highlighted>from any device.</Highlighted>
    </h2>
    <p class="pt-5 max-w-md font-medium text-zinc-500">
      You will only need an internet connection.<br />That's it.
    </p>
  </div>

  <DeviceShowcase />
</section>
