<script lang="ts">
  import { formatLastMessageAt } from "$lib/utils/date";
  import { longPress } from "$lib/actions/longPress";
  import type { DisplayChat } from "$lib/stores/chats";
  import Avatar from "$lib/ui/Avatar.svelte";
  import ChatActions from "./ChatActions.svelte";
  import LastMessage from "./LastMessage.svelte";

  export let chat: DisplayChat;
  export let isSelected: boolean;

  let actionsOpen = false;
</script>

<li>
  <button
    on:contextmenu|preventDefault={() => (actionsOpen = true)}
    use:longPress={() => (actionsOpen = true)}
    class="w-full text-left"
  >
    <a
      href="/{chat.id}"
      class="flex items-center gap-3 p-2 border-b border-r-[3px] border-r-transparent
    {isSelected ? 'bg-zinc-100 !border-r-cyan-600' : ''}"
    >
      <Avatar user={chat.user} />

  <div class="flex-grow">
      <div class="flex gap-4 justify-between items-center">
        <p class="font-medium">{chat.user.alias || chat.user.name}</p>
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
      </div>

      <div class="flex gap-4 justify-between items-center">
        <LastMessage {chat} />
        <div
          class="flex flex-col gap-1.5 justify-between items-end py-1 min-w-fit"
        >
          {#if chat.unreadCount > 0}
            <p
              class="px-1.5 pt-0.5 font-mono text-xs text-center text-cyan-50 bg-cyan-600 rounded-full"
            >
              {chat.unreadCount}
            </p>
          {/if}
        </div>
      </div>
      </div>
    </a>
  </button>

  {#if actionsOpen}
    <ChatActions bind:isOpen={actionsOpen} {chat} />
  {/if}
</li>
