<script lang="ts">
  import { page } from "$app/stores";
  import type { Chat } from "$lib/db/chat/getChats";
  import ActionIconButton from "$lib/ui/ActionIconButton.svelte";
  import ActionIconLink from "$lib/ui/ActionIconLink.svelte";
  import Avatar from "$lib/ui/Avatar.svelte";

  export let chat: Chat;
</script>

<div class="flex gap-2 justify-between items-center p-2 border-b bg-zinc-50">
  <a
    href="/k/{chat.id}?info"
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
  </a>

  <div class="flex gap-2">
    <ActionIconLink
      href={$page.url.pathname + "?search"}
      title="Search messages"
      icon="/icons/search.svg"
    />
    <ActionIconButton title="More options" icon="/icons/actions.svg" />
  </div>
</div>
