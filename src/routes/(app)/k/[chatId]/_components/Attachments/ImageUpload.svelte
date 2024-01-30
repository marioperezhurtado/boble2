<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { onMount } from "svelte";
  import { replyingTo } from "$lib/stores/store";
  import { encryptMessageField } from "$lib/utils/encryption";
  import { uploadFileFromClient } from "$lib/utils/file";
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

    const encryptedImageId = await encryptMessageField(
      presignedPostData.fields.key,
      $page.params.chatId,
    );
    const encryptedCaption = await encryptMessageField(
      caption,
      $page.params.chatId,
    );

    $sendImage.mutate({
      imageId: encryptedImageId,
      caption: encryptedCaption,
      chatId: $page.params.chatId,
      replyToId: $replyingTo?.id,
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
        {#if !isUploading}
          <img src="/icons/upload-light.svg" alt="Upload" class="w-3.5 h-3.5" />
        {/if}
      </Button>
    </form>
  </Modal>
{/if}
