<script lang="ts">
  import { env } from "$env/dynamic/public";
  import CopyText from "$lib/ui/CopyText.svelte";

  export let userId: string;
</script>

<section
  class="flex flex-col justify-center p-6 w-full max-w-lg bg-white rounded-md border shadow-md"
>
  <h1 class="pb-3 text-xl font-bold">Connect with your friends</h1>
  <p class="pb-8 text-sm text-zinc-500">
    These are some methods to connect with your friends and start chatting.
  </p>

  <div class="flex flex-col gap-4 text-sm">
    <div>
      <p class="pb-1 font-medium">Invite link</p>
      <CopyText text="{env.PUBLIC_SITE_URL}/invite/{userId}" />
    </div>
  </div>
</section>
