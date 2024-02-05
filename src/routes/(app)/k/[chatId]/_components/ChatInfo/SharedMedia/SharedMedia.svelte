<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { decryptMessage } from "$lib/utils/encryption";
  import type { RouterOutputs } from "$lib/trpc/shared";
  import Spinner from "$lib/ui/Spinner.svelte";
  import MediaList from "./MediaList.svelte";
  import DocumentList from "./DocumentList.svelte";
  import LinkList from "./LinkList.svelte";
  import AudioList from "./AudioList.svelte";

  type Messages = RouterOutputs["message"]["getMediaMessages"];

  const MEDIA_TABS = [
    { title: "Media", types: ["image", "video"] },
    { title: "Documents", types: ["document"] },
    { title: "Links", types: ["link"] },
    { title: "Voice", types: ["audio"] },
  ];

  let selectedTab = MEDIA_TABS[0] as (typeof MEDIA_TABS)[number];
  let mediaMessages: Messages | undefined = undefined;

  const getMediaMessages = trpc.message.getMediaMessages.createQuery(
    { chatId: $page.params.chatId },
    { staleTime: 0 },
  );

  $: if ($getMediaMessages.data) {
    (async () => {
      const decryptedMessages = await Promise.all(
        $getMediaMessages.data.map((m) =>
          decryptMessage(m, $page.params.chatId),
        ),
      );
      mediaMessages = decryptedMessages;
    })();
  }

  $: filteredMessages = mediaMessages?.filter((message) =>
    selectedTab.types.includes(message.type),
  );
</script>

<div class="border-b">
  <ul
    class="grid relative grid-cols-4 text-sm font-medium text-center text-zinc-500"
  >
    {#each MEDIA_TABS as tab}
      <li>
        <button
          on:click={() => (selectedTab = tab)}
          class="pt-3 pb-2 w-full"
          class:text-cyan-700={selectedTab === tab}
        >
          {tab.title}
        </button>
      </li>
    {/each}
  </ul>

  <div
    class="w-1/4 transition-all h-[3px]"
    style="transform: translateX(calc(100% * {MEDIA_TABS.indexOf(
      selectedTab,
    )}))"
  >
    <div class="mx-auto w-10 h-full bg-cyan-600 rounded-full" />
  </div>
</div>

<div class="overflow-y-auto h-full">
  {#if $getMediaMessages.isLoading}
    <Spinner class="mx-auto mt-8 w-8 h-8 border-cyan-700" />
  {:else if !filteredMessages?.length}
    <p class="p-2 text-sm font-medium text-zinc-500">No messages found.</p>
  {:else if selectedTab.title === "Media"}
    <MediaList messages={filteredMessages} />
  {:else if selectedTab.title === "Documents"}
    <DocumentList messages={filteredMessages} />
  {:else if selectedTab.title === "Links"}
    <LinkList messages={filteredMessages} />
  {:else if selectedTab.title === "Voice"}
    <AudioList messages={filteredMessages} />
  {/if}
</div>
