<script lang="ts">
  import Highlighted from "$lib/ui/Highlighted.svelte";
  import DeviceShowcase from "./DeviceShowcase.svelte";
</script>

<section class="flex flex-col gap-10 justify-between items-center px-8 pt-24 mx-auto max-w-screen-lg text-center sm:pt-52 md:flex-row md:items-start md:text-left">
  <div>
    <h2 class="max-w-md text-3xl font-extrabold sm:text-4xl">
      Chat with your friends<br />
      <Highlighted>from any device.</Highlighted>
    </h2>
    <p class="pt-6 mx-auto max-w-xs font-medium md:mx-0 text-zinc-500">
      You will only need an Internet connection. That's it.
    </p>
  </div>

  <DeviceShowcase />
</section>
