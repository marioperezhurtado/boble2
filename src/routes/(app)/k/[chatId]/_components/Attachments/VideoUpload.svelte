<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { onMount } from "svelte";
  import { replyingTo } from "$lib/stores/store";
  import Button from "$lib/ui/Button.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import Input from "$lib/ui/Input.svelte";
  import FormError from "$lib/ui/FormError.svelte";
  import { uploadFileFromClient } from "$lib/utils/file";

  export let onClose: () => void;

  let fileInput: HTMLInputElement;
  let selectedFile: File | null = null;
  let caption = "";

  const sendVideo = trpc($page).message.sendVideo.createMutation({
    retry: false,
    onSuccess: () => {
      $replyingTo = null;
      onClose();
    },
  });

  const createPresignedPost = trpc(
    $page,
  ).createPresignedPost.video.createMutation({
    retry: false,
  });

  async function handleSendVideo() {
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

    $sendVideo.mutate({
      videoId: presignedPostData.fields.key,
      chatId: $page.params.chatId,
      replyToId: $replyingTo?.id,
      caption,
    });
  }

  $: isUploading = $sendVideo.isPending || $createPresignedPost.isPending;
  $: error =
    $sendVideo.error?.data?.error || $createPresignedPost.error?.data?.error;

  onMount(() => fileInput.click());
</script>

<form on:submit|preventDefault={handleSendVideo}>
  <input
    bind:this={fileInput}
    on:input={() => (selectedFile = fileInput?.files?.[0] ?? null)}
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

      <div class="flex gap-2 mt-5">
        <Input
          bind:value={caption}
          placeholder="Add a caption"
          name="caption"
        />
        <Button type="submit" isLoading={isUploading} class="min-w-fit">
          Upload
          {#if !isUploading}
            <img
              src="/icons/upload-light.svg"
              alt="Upload"
              class="w-3.5 h-3.5"
            />
          {/if}
        </Button>
      </div>
    </Modal>
  {/if}
</form>
