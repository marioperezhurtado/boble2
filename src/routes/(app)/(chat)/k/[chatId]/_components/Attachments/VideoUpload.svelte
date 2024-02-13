<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { onMount } from "svelte";
  import { replyingTo } from "$lib/stores/store";
  import { uploadFileFromClient, getVideoInfo } from "$lib/utils/file";
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

  const sendVideo = trpc.message.sendVideo.createMutation({
    onSuccess: () => {
      $replyingTo = null;
      onClose();
    },
  });

  const createPresignedPost = trpc.createPresignedPost.video.createMutation();

  async function handleSendVideo() {
    if (!selectedFile) return;

    const [presignedPostData, videoInfo] = await Promise.all([
      $createPresignedPost.mutateAsync(),
      getVideoInfo(selectedFile),
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

    const [encryptedVideoId, encryptedCaption] = await Promise.all([
      encryptMessageField(presignedPostData.fields.key, $page.params.chatId),
      encryptMessageField(caption, $page.params.chatId),
    ]);

    const newVideo = await $sendVideo.mutateAsync({
      videoId: encryptedVideoId,
      caption: encryptedCaption,
      chatId: $page.params.chatId,
      replyToId: $replyingTo?.id,
      width: videoInfo.width,
      height: videoInfo.height,
      duration: videoInfo.duration,
    });

    sendMessage({
      ...newVideo,
      createdAt: new Date(newVideo.createdAt),
      imageInfo: null,
      documentInfo: null,
      linkPreview: null,
      audioInfo: null,
    });
  }

  $: isUploading = $sendVideo.isPending || $createPresignedPost.isPending;
  $: error =
    $sendVideo.error?.data?.error || $createPresignedPost.error?.data?.error;

  onMount(() => fileInput.click());
</script>

<input
  bind:this={fileInput}
  on:input={() => (selectedFile = fileInput?.files?.[0] ?? null)}
  on:cancel={onClose}
  type="file"
  name="video"
  accept="video/*"
  hidden
/>

{#if selectedFile}
  <Modal title="Upload video" {onClose}>
    <div class="p-2 mb-5 w-full h-56 rounded-md border bg-zinc-100">
      <!-- svelte-ignore a11y-media-has-caption -->
      <video controls class="object-contain mx-auto w-full h-full">
        <source
          src={URL.createObjectURL(selectedFile)}
          type={selectedFile.type}
        />
      </video>
    </div>

    {#if error}
      <FormError message={error} />
    {/if}

    <form on:submit|preventDefault={handleSendVideo} class="flex gap-2 mt-5">
      <Input bind:value={caption} placeholder="Add a caption" name="caption" />
      <Button isLoading={isUploading} class="min-w-fit">
        Upload
        <img src="/icons/upload-light.svg" alt="Upload" class="w-3.5 h-3.5" />
      </Button>
    </form>
  </Modal>
{/if}
