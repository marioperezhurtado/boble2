<script lang="ts">
  import Highlighted from "$lib/ui/Highlighted.svelte";
  import EncryptedMessageEffect from "./EncryptedMessageEffect.svelte";
</script>

<section
  class="flex flex-col gap-10 justify-between items-center px-8 pt-24 mx-auto max-w-screen-lg sm:pt-52 lg:flex-row lg:gap-16"
>
  <div class="w-full max-w-md">
    <h2 class="text-3xl font-extrabold sm:text-4xl">
      Your private chats...<br />
      <Highlighted>really are.</Highlighted>
    </h2>
    <p class="pt-5 max-w-sm font-medium text-zinc-500">
      No one other than you and your friends will be able to read your messages.
    </p>
  </div>

  <ul
    class="flex flex-col flex-grow gap-3 p-4 rounded-md border shadow-md
    bg-stone-100 w-full max-w-md bg-[url('/pattern.png')]"
  >
    <EncryptedMessageEffect text="Your messages are encrypted." isOwn />
    <EncryptedMessageEffect text="No one can read them." isOwn={false} />
    <EncryptedMessageEffect text="Not even us." isOwn />
  </ul>
</section>
