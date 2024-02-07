<script lang="ts">
  import { goto } from "$app/navigation";
  import { trpc } from "$lib/trpc/client";
  import AppHeader from "../../_components/AppHeader.svelte";
  import Avatar from "$lib/ui/Avatar.svelte";
  import Button from "$lib/ui/Button.svelte";
  import Link from "$lib/ui/Link.svelte";

  export let data;

  const openChat = trpc.chat.open.createMutation({
    onSuccess: async (chatId) => goto(`/k/${chatId}`),
    onError: () => goto("/k"),
  });

  function handleOpenChat() {
    $openChat.mutate({ userId: data.user.id });
  }
</script>

<AppHeader />

<main class="py-8 px-5 sm:py-10">
  <div class="p-8 mx-auto max-w-xl bg-white rounded-md border shadow-md">
    <div class="flex flex-col gap-4 items-center text-center">
      <Avatar user={data.user} size="large" />
      <h1 class="mt-4 text-lg sm:text-xl text-balance">
        <strong>{data.user.name}</strong> has invited you to join a chat
      </h1>
      <span class="text-sm text-zinc-500">({data.user.email})</span>
    </div>

    <hr class="my-8" />

    <div class="flex flex-col gap-1 text-sm text-center">
      <p>
        Press the button below to start chatting with {data.user.name}.
      </p>
    </div>

    <Button
      on:click={handleOpenChat}
      isLoading={$openChat.isPending}
      intent="primary"
      class="mx-auto mt-6"
    >
      <img src="/icons/chat-light.svg" alt="Chat" class="w-4 h-4" />
      Join chat
    </Button>

    <hr class="my-8" />

    <div class="flex flex-col gap-1 text-sm">
      <p>
        <strong>New to Boble? </strong>Boble is a real-time web chat
        application.
      </p>
      <p>
        You can chat with your friends and family from any device. Boble
        implements end-to-end encryption to ensure your privacy and security.
        <Link href="/security">Learn more</Link>
      </p>
    </div>
  </div>
</main>
