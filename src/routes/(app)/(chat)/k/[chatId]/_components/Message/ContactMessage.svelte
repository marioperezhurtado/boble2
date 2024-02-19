<script lang="ts">
  import type { Message } from "$lib/db/message/getMessages";
  import MessageBubble from "./MessageBubble.svelte";
  import MessageStatus from "./MessageStatus.svelte";

  export let message: Message;
  export let lastReadAt: Date;
  export let isOwn: boolean;
  export let isFirst: boolean;
</script>

<MessageBubble {message} {isOwn} {isFirst}>
  <a
    href="/contacts?createContact={message.source}&name={message.text}"
    class={`flex gap-3 items-center py-2 pr-4 pl-3 min-w-60 rounded mb-1
      ${isOwn ? "bg-cyan-800" : "bg-zinc-100"}
    `}
  >
    <img
      src={isOwn ? "/icons/contact-light.svg" : "/icons/contact.svg"}
      alt="Contact"
      class="w-6 h-6"
    />
    <div>
      <h2 class="font-semibold">{message.text}</h2>
      <h3 class="text-xs">{message.source}</h3>
    </div>
  </a>

  <MessageStatus {message} {lastReadAt} {isOwn} />
</MessageBubble>
