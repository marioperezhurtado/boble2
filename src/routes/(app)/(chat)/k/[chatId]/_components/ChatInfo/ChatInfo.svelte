<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "../../$types";
  import ChatInfoMenu from "./ChatInfoMenu.svelte";
  import ContactDetails from "./ContactDetails.svelte";
  import ChatDangerActions from "./ChatDangerActions.svelte";
  import ChatOptions from "./ChatOptions.svelte";

  $: data = $page.data as PageData;
  $: user = data.chat.user;
</script>

<ChatInfoMenu title="Chat info" backTo={$page.url.pathname}>
  <ContactDetails />
  <ChatOptions />
  <ChatDangerActions userId={user.id} isBlocked={!!user.isBlocked} />
</ChatInfoMenu>
