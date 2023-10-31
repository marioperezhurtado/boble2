<script lang="ts">
	import { capitalize } from '$lib/utils/text';
	import type { Chats } from '$lib/db/getChats';

	export let initialChats: Chats;
	export let filteredChats: Chats;

	let search = '';

	$: {
		const trimedSearch = search.trim();
		if (trimedSearch === '') {
			filteredChats = initialChats;
		} else {
			filteredChats = initialChats.filter((chat) =>
				chat.user.name?.toLowerCase().includes(search.toLowerCase())
			);
		}
	}
</script>

<div class="p-2">
	<input
		value={search}
		on:input={(e) => (search = capitalize(e.currentTarget.value))}
		id="search"
		name="search"
		type="search"
		placeholder="Search chats"
		class="py-1.5 px-2 w-full text-sm rounded-md border shadow-sm placeholder:text-zinc-400 focus:outline-cyan-600"
		autocomplete="off"
	/>
</div>
