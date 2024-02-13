<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { onMount } from "svelte";
  import { replyingTo } from "$lib/stores/store";
  import { formatFileSize, uploadFileFromClient } from "$lib/utils/file";
  import { encryptMessageField } from "$lib/utils/encryption";
  import { sendMessage } from "$lib/socket/client";
  import Button from "$lib/ui/Button.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import Input from "$lib/ui/Input.svelte";
  import FormError from "$lib/ui/FormError.svelte";

  export let onClose: () => void;

  let fileInput: HTMLInputElement;
  let selectedFile: File | null = null;
  let caption = "";

  const sendDocument = trpc.message.sendDocument.createMutation({
    onSuccess: () => {
      $replyingTo = null;
      onClose();
    },
  });

  const createPresignedPost =
    trpc.createPresignedPost.document.createMutation();

  async function handleSendDocument() {
    if (!selectedFile) return;

    const presignedPostData = await $createPresignedPost.mutateAsync();

    try {
      await uploadFileFromClient({
        file: selectedFile,
        presignedPostData,
      });
    } catch (e) {
      $replyingTo = null;
      onClose();
      return;
    }

    const [encryptedDocumentId, encryptedCaption, encryptedDocumentName] =
      await Promise.all([
        encryptMessageField(presignedPostData.fields.key, $page.params.chatId),
        encryptMessageField(caption, $page.params.chatId),
        encryptMessageField(selectedFile.name, $page.params.chatId),
      ]);

    const newDocument = await $sendDocument.mutateAsync({
      documentId: encryptedDocumentId,
      caption: encryptedCaption,
      name: encryptedDocumentName,
      size: selectedFile.size,
      chatId: $page.params.chatId,
      replyToId: $replyingTo?.id,
    });

    sendMessage({
      ...newDocument,
      createdAt: new Date(newDocument.createdAt),
      imageInfo: null,
      videoInfo: null,
      linkPreview: null,
      audioInfo: null,
    });
  }

  $: isUploading = $sendDocument.isPending || $createPresignedPost.isPending;
  $: error =
    $sendDocument.error?.data?.error || $createPresignedPost.error?.data?.error;

  onMount(() => fileInput.click());
</script>

<input
  bind:this={fileInput}
  on:input={() => (selectedFile = fileInput?.files?.[0] ?? null)}
  on:cancel={onClose}
  type="file"
  name="document"
  hidden
/>

{#if selectedFile}
  <Modal title="Upload document" {onClose}>
    <div class="flex gap-2 p-2 pr-4 mb-5 rounded-md border bg-zinc-100">
      <img src="/icons/document.svg" alt="Document icon" class="w-10 h-10" />
      <div>
        <p class="font-medium break-all">{selectedFile.name}</p>
        <p class="text-xs text-zinc-500">
          {#if selectedFile.name.includes(".")}
            {selectedFile.name.split(".").pop()?.toUpperCase()} ·{" "}
          {/if}
          {formatFileSize(selectedFile.size)}
        </p>
      </div>
    </div>

    {#if error}
      <FormError message={error} />
    {/if}

    <form on:submit|preventDefault={handleSendDocument} class="flex gap-2 mt-5">
      <Input bind:value={caption} placeholder="Add a caption" name="caption" />
      <Button isLoading={isUploading} class="min-w-fit">
        Upload
        <img src="/icons/upload-light.svg" alt="Upload" class="w-3.5 h-3.5" />
      </Button>
    </form>
  </Modal>
{/if}
