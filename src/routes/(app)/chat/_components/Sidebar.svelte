<script lang="ts">
  import { page } from "$app/stores";
  import Avatar from "$lib/ui/Avatar.svelte";
  import ActionIconLink from "$lib/ui/ActionIconLink.svelte";
  import type { LayoutData } from "../$types";

  $: data = $page.data as LayoutData;
</script>

<aside
  class="w-full md:block md:max-w-sm bg-zinc-50"
  class:hidden={!!$page.params.chatId || !!$page.params.contactId}
>
  <div class="flex justify-between items-center p-2 border-b">
    <a href="/profile">
      <Avatar user={data.user} size="small" />
    </a>
    <div class="flex gap-2">
     <ActionIconLink
        href="/chat"
        title="Chats"
        icon="/icons/chat.svg"
      />
      <ActionIconLink
        href="/contacts"
        title="Contacts"
        icon="/icons/contact.svg"
      />
      <ActionIconLink
        href="/settings"
        title="Settings"
        icon="/icons/settings.svg"
      />
    </div>
  </div>

  <slot />
</aside>
