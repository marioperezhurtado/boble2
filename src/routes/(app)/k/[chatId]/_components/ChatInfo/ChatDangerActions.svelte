<script lang="ts">
  import { page } from "$app/stores";
  import BlockUnblockButton from "$lib/ui/BlockUnblockButton.svelte";
  import ButtonLink from "$lib/ui/ButtonLink.svelte";

  export let userId: string;
  export let isBlocked: boolean;
</script>

<div class="flex flex-col gap-2 mt-auto p-4 pt-14">
  <BlockUnblockButton {userId} {isBlocked} />
  <ButtonLink
    href={$page.url.pathname + "?deleteChat=" + $page.params.chatId}
    intent="danger"
    fullWidth
  >
    <img src="/icons/delete-light.svg" alt="Delete chat" class="w-4 h-4" />
    Delete chat
  </ButtonLink>
</div>
