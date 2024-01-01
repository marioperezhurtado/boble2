<script lang="ts">
  import { onMount } from "svelte";
  import { replyingTo } from "../stores";
  import { capitalize } from "$lib/utils/text";
  import Button from "$lib/ui/Button.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import Input from "$lib/ui/Input.svelte";
  import { enhance } from "$app/forms";

  export let onClose: () => void;

  let selectedFile: File | null = null;
  let fileInput: HTMLInputElement;
  let isUploading = false;

  $: fileType = selectedFile?.type.split("/")[0] ?? "file";

  onMount(() => fileInput.click());
</script>

<form
  method="post"
  action="?/send{capitalize(fileType)}"
  enctype="multipart/form-data"
  use:enhance={() => {
    isUploading = true;

    return async ({ update }) => {
      await update();
      isUploading = false;
      $replyingTo = null;
      onClose();
    };
  }}
>
  <input
    bind:this={fileInput}
    on:input={() => (selectedFile = fileInput?.files?.[0] ?? null)}
    type="file"
    name={fileType}
    accept="image/jpeg,image/jpg,image/png,image/webp,video/*"
    hidden
  />
  <input name="replyToId" value={$replyingTo?.id ?? ""} hidden />

  {#if selectedFile}
    <Modal title="Upload {fileType}" {onClose}>
      <div class="p-2 w-full h-56 rounded-md border bg-zinc-100">
        {#if fileType === "video"}
          <!-- svelte-ignore a11y-media-has-caption -->
          <video controls class="object-contain mx-auto w-full h-full">
            <source
              src={URL.createObjectURL(selectedFile)}
              type={selectedFile.type}
            />
          </video>
        {:else if fileType === "image"}
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Upload preview"
            class="object-contain mx-auto w-full h-full"
          />
        {/if}
      </div>

      <div class="flex gap-2 mt-5">
        <Input placeholder="Add a caption" name="caption" id="caption" />
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
