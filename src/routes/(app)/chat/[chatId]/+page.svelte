<script lang="ts">
	import { page } from '$app/stores';
	import MessageList from './_components/MessageList.svelte';
	import SendMessage from './_components/SendMessage.svelte';
	import type { PageData } from './$types';

	$: data = $page.data as PageData;
	$: chat = data.chats?.find((chat) => chat.id === $page.params.chatId);
</script>

<MessageList
	initialMessages={data.messages ?? []}
	lastReadAt={chat?.lastReadAt ?? new Date(0)}
	chatId={$page.params.chatId}
	userId={data.user.id}
/>
<SendMessage />
