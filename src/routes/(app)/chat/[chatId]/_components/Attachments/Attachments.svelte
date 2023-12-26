<script lang="ts">
  import { clickOutside } from "$lib/actions/clickOutside";
  import { fly } from "svelte/transition";
  import AttachmentItem from "./AttachmentItem.svelte";
  import ImageVideoUpload from "./ImageVideoUpload.svelte";

  let isOpen = false;
  let openAttachment:
    | "photo-video"
    | "document"
    | "location"
    | "contact"
    | null = null;

  function handleOpenAttachment(attachment: typeof openAttachment) {
    openAttachment = attachment;
    isOpen = false;
  }
</script>

<svelte:window on:keydown={(e) => e.key === "Escape" && (isOpen = false)} />

<div
  use:clickOutside={() => (isOpen = false)}
  class="flex relative items-center min-w-fit"
>
  <button
    on:click={() => (isOpen = !isOpen)}
    type="button"
    title="Attachments"
    aria-label="Attachments"
    class="p-0.5 rounded-md min-w-fit focus:outline-cyan-600"
  >
    <img src="/icons/plus.svg" alt="Attach" class="w-7 h-7" />
  </button>

  {#if isOpen}
    <ul
      transition:fly={{ y: 30, duration: 150 }}
      class="flex absolute bottom-12 z-20 flex-col flex-1 w-44 text-sm
      font-medium bg-white rounded-md border shadow-md text-zinc-600"
    >
      <AttachmentItem
        onOpen={() => handleOpenAttachment("photo-video")}
        text="Photo or Video"
        icon="/icons/image.svg"
      />
      <AttachmentItem
        onOpen={() => handleOpenAttachment("document")}
        text="Document"
        icon="/icons/document.svg"
      />
      <AttachmentItem
        onOpen={() => handleOpenAttachment("contact")}
        text="Contact"
        icon="/icons/contact.svg"
      />
    </ul>
  {/if}

  {#if openAttachment === "photo-video"}
    <ImageVideoUpload onClose={() => (openAttachment = null)} />
  {/if}
</div>
