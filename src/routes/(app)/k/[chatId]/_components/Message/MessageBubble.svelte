<script lang="ts">
  import { messages } from "$lib/stores/store";
  import type { Message } from "$lib/db/message/getMessages";
  import ReplyTo from "./ReplyTo.svelte";

  export let message: Message;
  export let isOwn: boolean;
  export let isFirst: boolean;

  $: replyTo = $messages.find((m) => m.id === message.replyToId);
</script>

<div
  class={`relative rounded-md shadow-sm p-1
      ${isOwn ? "bg-cyan-700" : "bg-white"}
      ${isFirst ? (isOwn ? "rounded-tr-none" : "rounded-tl-none") : ""}
      `}
>
  {#if message.replyToId}
    <ReplyTo replyTo={replyTo ?? null} {isOwn} />
  {/if}

  <slot />

  {#if isFirst}
    <span
      class={`absolute top-0 w-0 h-0 border-transparent border-t-[10px]
        ${
          isOwn
            ? "border-t-cyan-700 border-r-[5px] -right-1"
            : "border-t-white border-l-[5px] -left-1"
        }
      `}
    />
  {/if}
</div>
