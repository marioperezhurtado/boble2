<script lang="ts">
  import { page } from "$app/stores";
  import Modal from "$lib/ui/Modal.svelte";
  import ButtonLink from "$lib/ui/ButtonLink.svelte";

  const DETAILS_PARAM = "about-e2ee";

  $: detailsOpen = $page.url.searchParams.has(DETAILS_PARAM);
</script>

<a
  href="{$page.url.pathname}?{DETAILS_PARAM}"
  class="flex flex-wrap gap-1 justify-center items-center py-1.5 px-2.5 mx-auto mt-2 text-xs bg-white rounded-md shadow-sm w-fit"
>
  <img src="/icons/lock.svg" alt="Lock icon" class="-mt-0.5 w-3 h-3" />
  <p>Messages are end-to-end encrypted.</p>
  <p>No one outside of this chat can read them.</p>
  <p>Tap to learn more.</p>
</a>

{#if detailsOpen}
  <Modal title="Messages are protected." backTo={$page.url.pathname}>
    <div class="flex flex-col gap-8">
      <p class="text-sm text-zinc-500">
        End-to-end encryption protects your messages and chats. No one outside
        of this chat can read your messages, not even us. This applies to the
        following:
      </p>

      <ul class="flex flex-col gap-3 text-sm font-medium text-zinc-500">
        <li class="flex gap-2.5 items-center">
          <img src="/icons/chat.svg" alt="Message icon" class="w-5 h-5" />
          <p>Text messages and links</p>
        </li>
        <li class="flex gap-2.5 items-center">
          <img src="/icons/camera.svg" alt="Camera icon" class="w-5 h-5" />
          <p>Photos, videos and documents</p>
        </li>
        <li class="flex gap-2.5 items-center">
          <img src="/icons/gif.svg" alt="GIF icon" class="w-5 h-5" />
          <p>GIFs and stickers</p>
        </li>
        <li class="flex gap-2.5 items-center">
          <img src="/icons/location.svg" alt="Location icon" class="w-5 h-5" />
          <p>Shared locations</p>
        </li>
      </ul>

      <div class="flex flex-wrap gap-3 xs:flex-nowrap">
        <ButtonLink intent="secondary" href={$page.url.pathname} fullWidth>
        Got it
        </ButtonLink>
        <ButtonLink href="/blog/security" fullWidth>More information</ButtonLink>
      </div>
    </div>
  </Modal>
{/if}
