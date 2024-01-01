<script lang="ts">
  import { onMount } from "svelte";
  import { replyingTo } from "../stores";
  import { formatFileSize } from "$lib/utils/file";
  import Button from "$lib/ui/Button.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import Input from "$lib/ui/Input.svelte";
  import { enhance } from "$app/forms";

  export let onClose: () => void;

  let selectedFile: File | null = null;
  let fileInput: HTMLInputElement;
  let isUploading = false;

  $: fileExtension = selectedFile?.name.split(".").pop();

  onMount(() => fileInput.click());
</script>

<form
  method="post"
  action="?/sendDocument"
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
    name="document"
    hidden
  />
  <input name="replyToId" value={$replyingTo?.id ?? ""} hidden />

  {#if selectedFile}
    <Modal title="Upload document" {onClose}>
      <div class="flex gap-2 p-2 pr-4 rounded-md border bg-zinc-100">
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

      <div class="flex gap-2 mt-5">
        <Input placeholder="Add a caption" name="caption" id="caption" />
        <Button isLoading={isUploading} class="min-w-fit">
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
