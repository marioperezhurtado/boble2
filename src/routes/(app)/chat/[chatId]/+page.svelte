<script lang="ts">
  import { page } from "$app/stores";
  import MessageList from "./_components/MessageList.svelte";
  import SendMessage from "./_components/SendMessage.svelte";
  import ChatTopBar from "./_components/ChatTopBar.svelte";
  import type { PageData } from "./$types";

  $: data = $page.data as PageData;
</script>

<ChatTopBar
  name={data.chat.user.name}
  image={data.chat.user.image}
  email={data.chat.user.email}
  status={data.chat.user.status}
/>
<MessageList
  initialMessages={data.messages ?? []}
  lastReadAt={data.chat?.lastReadAt ?? new Date(0)}
  chatId={$page.params.chatId}
  userId={data.user.id}
/>
<SendMessage />
