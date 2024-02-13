<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { onMount } from "svelte";
  import { replyingTo } from "$lib/stores/store";
  import { encryptMessageField } from "$lib/utils/encryption";
  import { uploadFileFromClient, getImageDimensions } from "$lib/utils/file";
  import { sendMessage } from "$lib/socket/client";
  import Button from "$lib/ui/Button.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import Input from "$lib/ui/Input.svelte";
  import FormError from "$lib/ui/FormError.svelte";

  export let onClose: () => void;

  let fileInput: HTMLInputElement;
  let selectedFile: File | null = null;
  let caption = "";

  const sendImage = trpc.message.sendImage.createMutation({
    onSuccess: () => {
      $replyingTo = null;
      onClose();
    },
  });

  const createPresignedPost = trpc.createPresignedPost.image.createMutation();

  async function handleSendImage() {
    if (!selectedFile) return;

    const [presignedPostData, dimensions] = await Promise.all([
      $createPresignedPost.mutateAsync(),
      getImageDimensions(selectedFile),
    ]);

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

    const [encryptedImageId, encryptedCaption] = await Promise.all([
      encryptMessageField(presignedPostData.fields.key, $page.params.chatId),
      encryptMessageField(caption, $page.params.chatId),
    ]);

    const newImage = await $sendImage.mutateAsync({
      imageId: encryptedImageId,
      caption: encryptedCaption,
      chatId: $page.params.chatId,
      replyToId: $replyingTo?.id,
      width: dimensions.width,
      height: dimensions.height,
    });

    sendMessage({
      ...newImage,
      createdAt: new Date(newImage.createdAt),
      videoInfo: null,
      linkPreview: null,
      documentInfo: null,
      audioInfo: null,
    });
  }

  $: isUploading = $sendImage.isPending || $createPresignedPost.isPending;
  $: error =
    $sendImage.error?.data?.error || $createPresignedPost.error?.data?.error;

  onMount(() => fileInput.click());
</script>

<input
  bind:this={fileInput}
  on:input={() => (selectedFile = fileInput?.files?.[0] ?? null)}
  on:cancel={onClose}
  type="file"
  name="image"
  accept="image/jpeg,image/jpg,image/png,image/webp"
  hidden
/>

{#if selectedFile}
  <Modal title="Upload image" {onClose}>
    <div class="p-2 mb-5 w-full h-56 rounded-md border bg-zinc-100">
      <img
        src={URL.createObjectURL(selectedFile)}
        alt="Upload preview"
        class="object-contain mx-auto w-full h-full"
      />
    </div>

    {#if error}
      <FormError message={error} />
    {/if}

    <form on:submit|preventDefault={handleSendImage} class="flex gap-2 mt-5">
      <Input bind:value={caption} placeholder="Add a caption" name="caption" />
      <Button isLoading={isUploading} class="min-w-fit">
        Upload
        <img src="/icons/upload-light.svg" alt="Upload" class="w-3.5 h-3.5" />
      </Button>
    </form>
  </Modal>
{/if}
