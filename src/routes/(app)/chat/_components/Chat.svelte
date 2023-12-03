<script lang="ts">
  import { formatLastMessageAt } from "$lib/utils/date";
  import { isValidUrl } from "$lib/utils/url";
  import Avatar from "$lib/ui/Avatar.svelte";
  import type { Chat } from "$lib/db/chat/getChats";

  export let chat: Chat;
  export let isSelected: boolean;

  $: isLastMessageOwn = chat.lastMessage?.senderId !== chat.user.id;
  $: lastReadAt = chat.user.lastReadAt ?? chat.createdAt;
  $: isLastMessageRead = chat.lastMessage?.createdAt! <= lastReadAt!;
</script>

<li>
  <a
    href={`/chat/${chat.id}`}
    class="flex items-center gap-3 p-2 border-b border-r-[3px] border-r-transparent
    {isSelected ? 'bg-zinc-100 !border-r-cyan-600' : ''}"
  >
    <Avatar user={chat.user} />

    <div class="flex overflow-hidden flex-col w-full">
      <p class="font-medium">{chat.user.alias || chat.user.name}</p>
      {#if chat.lastMessage}
        <p class="flex gap-0.5 items-center text-sm text-zinc-500">
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
          {#if chat.lastMessage.type === "image"}
            <!-- svelte-ignore a11y-img-redundant-alt -->
            <img
              src="/icons/camera.svg"
              alt="Photo icon"
              class="mr-0.5 w-3.5 h-3.5"
            />
            <span>Photo</span>
          {:else if chat.lastMessage.type === "gif"}
            <img src="/icons/gif.svg" alt="GIF icon" class="mr-0.5 w-4 h-4" />
            <span>GIF</span>
          {:else if isValidUrl(chat.lastMessage.text ?? "")}
            <img src="/icons/link.svg" alt="Link icon" class="mr-0.5 w-4 h-4" />
            <span
              class="line-clamp-1 overflow-ellipsis"
              title={chat.lastMessage.text ?? ""}
            >
              {chat.lastMessage.text}
            </span>
          {:else}
            <span
              class="line-clamp-1 overflow-ellipsis"
              title={chat.lastMessage.text ?? ""}
            >
              {chat.lastMessage.text}
            </span>
          {/if}
        </p>
      {/if}
    </div>

    <div class="flex flex-col gap-1.5 justify-between items-end py-1 min-w-fit">
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
