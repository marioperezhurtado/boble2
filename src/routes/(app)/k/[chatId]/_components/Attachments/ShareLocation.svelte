<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { replyingTo } from "$lib/stores/store";
  import { encryptMessageField } from "$lib/utils/encryption";
  import { sendMessage } from "$lib/socket/client";
  import Modal from "$lib/ui/Modal.svelte";
  import Link from "$lib/ui/Link.svelte";
  import Map from "$lib/ui/Map.svelte";
  import Input from "$lib/ui/Input.svelte";
  import Button from "$lib/ui/Button.svelte";
  import FormError from "$lib/ui/FormError.svelte";

  export let onClose: () => void;

  let text = "";

  const sendLocation = trpc.message.sendLocation.createMutation({
    onSuccess: () => {
      $replyingTo = null;
      onClose();
    },
  });

  async function getLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(resolve, onClose);
    });
  }

  async function handleSendLocation(coords: string) {
    const [encryptedText, encryptedCoords] = await Promise.all([
      encryptMessageField(text, $page.params.chatId),
      encryptMessageField(coords, $page.params.chatId),
    ]);

    const newLocation = await $sendLocation.mutateAsync({
      text: encryptedText,
      coords: encryptedCoords,
      chatId: $page.params.chatId,
      replyToId: $replyingTo?.id,
    });

    sendMessage({
      ...newLocation,
      createdAt: new Date(newLocation.createdAt),
      imageInfo: null,
      videoInfo: null,
      linkPreview: null,
      audioInfo: null,
      documentInfo: null,
    });
  }

  $: error = $sendLocation.error?.data?.error;
</script>

<Modal title="Share location" {onClose}>
  {#await getLocation()}
    <p class="text-sm text-zinc-500">
      Please grant permission to access your location.
    </p>
    <div class="w-full aspect-video border shadow-sm mt-5 bg-zinc-50" />
  {:then { coords }}
    <p class="text-sm text-zinc-500">
      Your location will be shared in this chat.
    </p>
    <p class="text-sm text-zinc-500">
      Don't worry, no one else will see it.
      <Link href="/security" class="text-cyan-600">Learn more</Link>
    </p>

    <Map
      title="Your current location"
      latitude={coords.latitude}
      longitude={coords.longitude}
      class="w-full aspect-video border rounded-md shadow-sm mt-5"
    />

    {#if error}
      <FormError message={error} />
    {/if}

    <form
      on:submit|preventDefault={() => {
        handleSendLocation(`${coords.latitude},${coords.longitude}`);
      }}
      class="flex gap-2 mt-5"
    >
      <Input bind:value={text} placeholder="Type a message" name="caption" />
      <Button
        isLoading={$sendLocation.isPending}
        aria-label="Send location"
        class="min-w-fit"
      >
        <img src="/icons/send-light.svg" alt="Send icon" class="w-4 h-4" />
      </Button>
    </form>
  {/await}
</Modal>
