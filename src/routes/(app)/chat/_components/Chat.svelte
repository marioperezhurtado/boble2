<script lang="ts">
  import { formatLastMessageAt } from "$lib/utils/date";
  import Avatar from "$lib/ui/Avatar.svelte";
  import type { Chat } from "$lib/db/chat/getChats";

  export let chat: Chat;
  export let isSelected: boolean;

  const isLastMessageOwn = chat.lastMessage?.senderId !== chat.user.id;
  const lastReadAt = chat.user.lastReadAt ?? chat.createdAt;
  const isLastMessageRead = chat.lastMessage?.createdAt! <= lastReadAt!;
</script>

<li>
  <a
    href={`/chat/${chat.id}`}
    class="flex items-center gap-3 p-2 border-b border-r-[3px] border-r-transparent
    {isSelected ? 'bg-zinc-100 !border-r-cyan-600' : ''}"
  >
    <Avatar user={chat.user} />
    <div class="flex flex-col flex-1">
      <p class="font-medium">{chat.user.alias || chat.user.name}</p>
      {#if chat.lastMessage}
        <p
          class="flex gap-0.5 items-center text-sm text-zinc-500"
          title={chat.lastMessage.text ?? ""}
        >
          {#if isLastMessageOwn}
            {#if isLastMessageRead}
              <img
                src="/icons/double-check-dark.svg"
                alt="Read"
                title="Read"
                class="-mb-0.5 w-4 h-4"
              />
            {:else}
              <img
                src="/icons/check-dark.svg"
                alt="Sent"
                title="Sent"
                class="-mb-0.5 w-4 h-4"
              />
            {/if}
          {/if}
          <span class="line-clamp-1">{chat.lastMessage.text}</span>
        </p>
      {/if}
    </div>

    <div class="flex flex-col gap-1.5 justify-between items-end py-1">
      <time
        class="text-xs"
        class:text-zinc-700={chat.unreadCount === 0}
        class:text-cyan-700={chat.unreadCount > 0}
        class:font-medium={chat.unreadCount > 0}
      >
        {#if chat.lastMessage?.createdAt}
          {formatLastMessageAt(new Date(chat.lastMessage.createdAt))}
        {:else if chat.createdAt}
          {formatLastMessageAt(new Date(chat.createdAt))}
        {/if}
      </time>
      {#if chat.unreadCount > 0}
        <p
          class="px-1.5 pt-0.5 font-mono text-xs text-center text-cyan-50 bg-cyan-600 rounded-full"
        >
          {chat.unreadCount}
        </p>
      {/if}
    </div>
  </a>
</li>
