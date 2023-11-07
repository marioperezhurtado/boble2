<script lang="ts">
  import Highlighted from "./Highlighted.svelte";
</script>

<section class="flex gap-10 justify-between items-start pt-40">
  <div>
    <h2 class="max-w-md text-4xl font-extrabold leading-snug">
      Chat with your friends
      <Highlighted>from any device.</Highlighted>
    </h2>
    <p class="pt-5 max-w-md font-medium text-zinc-500">
      You will only need an internet connection.<br />That's it.
    </p>
  </div>

  <div class="relative mr-10">
    <div
      class="overflow-hidden h-48 rounded-lg border-2 shadow-md border-zinc-600 aspect-video bg-zinc-200"
    >
      <div class="h-3 bg-cyan-700" />
      <div class="flex mx-auto w-2/3 h-full border-x bg-zinc-50">
        <div class="w-1/3 h-full border-r">
          <div class="border-b h-[15px]" />
          <div class="p-0.5 border-b">
            <div class="w-2.5 h-2.5 rounded-full border bg-zinc-100" />
          </div>
          <div class="p-0.5 border-b">
            <div class="w-2.5 h-2.5 rounded-full border bg-zinc-100" />
          </div>
          <div class="p-0.5 border-b">
            <div class="w-2.5 h-2.5 rounded-full border bg-zinc-100" />
          </div>
        </div>
        <div class="w-full">
          <div class="flex items-center p-0.5 pl-0.5 border-b">
            <div class="w-2.5 h-2.5 rounded-full border bg-zinc-100" />
          </div>
          <ul class="flex flex-col gap-0.5 p-1 h-36 bg-zinc-100">
            <div class="w-8 h-2.5 bg-white rounded-md border" />
            <div class="w-12 h-2.5 bg-white rounded-md border" />
            <div class="ml-auto w-10 h-2.5 bg-cyan-600 rounded-md border" />
            <div class="w-11 h-2.5 bg-white rounded-md border" />
            <div class="ml-auto w-10 h-2.5 bg-cyan-600 rounded-md border" />
            <div class="ml-auto w-12 h-2.5 bg-cyan-600 rounded-md border" />
            <div class="w-8 h-2.5 bg-white rounded-md border" />
            <div class="ml-auto w-8 h-2.5 bg-cyan-600 rounded-md border" />
            <div class="w-5 h-2.5 bg-white rounded-md border" />
            <div class="w-10 h-2.5 bg-white rounded-md border" />
            <div class="ml-auto w-10 h-2.5 bg-cyan-600 rounded-md border" />
          </ul>
          <div class="h-3 border-t" />
        </div>
      </div>
    </div>

    <div
      class="overflow-hidden absolute -right-8 -bottom-8 w-16 rounded-lg border-2 shadow-md border-zinc-600 aspect-[9/18] bg-zinc-50"
    >
      <div class="h-2 bg-cyan-700" />
      <ul class="flex flex-col gap-0.5 p-1 pb-5 bg-zinc-100">
        <div class="w-6 h-2 bg-white rounded-md border" />
        <div class="ml-auto w-7 h-2 bg-cyan-600 rounded-md border" />
        <div class="w-8 h-2 bg-white rounded-md border" />
        <div class="w-10 h-2 bg-white rounded-md border" />
        <div class="ml-auto w-6 h-2 bg-cyan-600 rounded-md border" />
        <div class="ml-auto w-4 h-2 bg-cyan-600 rounded-md border" />
        <div class="w-5 h-2 bg-white rounded-md border" />
        <div class="ml-auto w-6 h-2 bg-cyan-600 rounded-md border" />
      </ul>
      <div class="h-3.5 bg-white border" />
    </div>
  </div>
</section>
