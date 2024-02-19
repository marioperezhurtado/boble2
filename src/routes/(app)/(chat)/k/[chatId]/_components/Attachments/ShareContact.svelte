<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { replyingTo } from "$lib/stores/store";
  import { encryptMessageField } from "$lib/utils/encryption";
  import { sendMessage } from "$lib/socket/client";
  import type { RouterOutputs } from "$lib/trpc/shared";
  import Modal from "$lib/ui/Modal.svelte";
  import Spinner from "$lib/ui/Spinner.svelte";
  import Avatar from "$lib/ui/Avatar.svelte";
  import Button from "$lib/ui/Button.svelte";

  type Contact = RouterOutputs["contact"]["getAll"][number];

  export let onClose: () => void;

  let selectedContact: Contact | null = null;

  function handleToggleContact(contact: Contact) {
    selectedContact = selectedContact === contact ? null : contact;
  }

  const getContacts = trpc.contact.getAll.createQuery(undefined, {
    staleTime: 0,
  });

  const sendContact = trpc.message.sendContact.createMutation({
    onSettled: () => {
      $replyingTo = null;
      onClose();
    },
  });

  async function handleSendContact() {
    if (!selectedContact) return;

    const [encryptedAlias, encryptedEmail] = await Promise.all([
      encryptMessageField(selectedContact.alias, $page.params.chatId),
      encryptMessageField(selectedContact.email, $page.params.chatId),
    ]);

    const newContact = await $sendContact.mutateAsync({
      chatId: $page.params.chatId,
      alias: encryptedAlias,
      email: encryptedEmail,
    });

    sendMessage({
      ...newContact,
      createdAt: new Date(newContact.createdAt),
      imageInfo: null,
      videoInfo: null,
      linkPreview: null,
      audioInfo: null,
      documentInfo: null,
    });
  }
</script>

<Modal title="Share contact" {onClose}>
  <div class="h-72 flex flex-col">
    <p class="text-sm text-zinc-500 pb-5">
      Select a contact to share from the list below.
    </p>

    {#if $getContacts.isLoading}
      <Spinner class="mt-5 ml-2 w-7 h-7 border-cyan-700" />
    {:else if !$getContacts.data?.length}
      <p class="text-sm font-medium text-zinc-500">No contacts found.</p>
    {:else}
      <ul class="overflow-y-scroll flex-grow pr-2">
        {#each $getContacts.data as contact}
          <li>
            <button
              on:click={() => handleToggleContact(contact)}
              class="flex items-center gap-3 p-1.5 text-left border-2
              border-transparent w-full rounded-md transition"
              class:bg-zinc-100={selectedContact === contact}
            >
              <div class="relative">
                <Avatar user={contact} />
                {#if selectedContact === contact}
                  <img
                    src="/icons/check.svg"
                    alt="Selected"
                    class="absolute bottom-0 right-0 w-5 h-5 z-10 bg-cyan-600
                    rounded-full shadow-sm p-0.5"
                  />
                {/if}
              </div>
              <div>
                <p class="text-sm font-medium">{contact.alias}</p>
                <p class="text-xs text-zinc-500">{contact.email}</p>
              </div>
            </button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>

  {#if selectedContact}
    <Button
      on:click={handleSendContact}
      isLoading={$sendContact.isPending}
      class="ml-auto mt-2"
    >
      Share contact
    </Button>
  {/if}
</Modal>
