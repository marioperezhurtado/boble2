<script lang="ts">
  import { chatInfoOpen } from "./stores";
  import ActionIconButton from "$lib/ui/ActionIconButton.svelte";
  import Avatar from "$lib/ui/Avatar.svelte";
  import type { Chat } from "$lib/db/chat/getChats";

  export let chat: Chat;
</script>

<div class="flex gap-2 justify-between items-center p-2 border-b bg-zinc-50">
  <button
    on:click|stopPropagation={() => ($chatInfoOpen = true)}
    class="flex flex-grow gap-3 items-center text-left"
  >
    <Avatar user={chat.user} size="small" />
    <div>
      <h2 class="text-sm font-semibold">{chat.user.alias || chat.user.name}</h2>
      <p class="text-xs text-zinc-500 line-clamp-1">
        {#if chat.user.status?.length}
          ~{chat.user.status}
        {:else}
          {chat.user.email}
        {/if}
      </p>
    </div>
  </button>

  <div class="flex gap-2">
    <ActionIconButton title="Search messages" icon="/icons/search.svg" />
    <ActionIconButton title="More options" icon="/icons/actions.svg" />
  </div>
</div>
