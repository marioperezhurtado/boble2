<script lang="ts">
  import { onMount } from "svelte";
  import { replyingTo } from "../stores";
  import { formatFileSize } from "$lib/utils/file";
  import Button from "$lib/ui/Button.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import Input from "$lib/ui/Input.svelte";

  export let onClose: () => void;

  let selectedFile: File | null = null;
  let fileInput: HTMLInputElement;
  let isUploading = false;

  $: fileExtension = selectedFile?.name.split(".").pop();

  async function handleUploadFile() {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("document", selectedFile);
    formData.append("replyToId", $replyingTo?.id ?? "");

    isUploading = true;

    await fetch(`?/sendDocument`, {
      method: "POST",
      body: formData,
    });

    isUploading = false;
    $replyingTo = null;
    onClose();
  }

  onMount(() => fileInput.click());
</script>

<input
  bind:this={fileInput}
  on:input={() => (selectedFile = fileInput?.files?.[0] ?? null)}
  type="file"
  hidden
/>

{#if selectedFile}
  <Modal title="Upload document" {onClose}>
    <div class="flex gap-2 p-2 pr-4 rounded-md border bg-zinc-100">
      <img src="/icons/document.svg" alt="Document icon" class="w-10 h-10" />
      <div>
        <p class="font-medium break-all">{selectedFile.name}</p>
        <p class="text-xs text-zinc-500">
        {#if fileExtension}
          {fileExtension.toUpperCase()} ·   
        {/if}
        {formatFileSize(selectedFile.size)}</p>
      </div>
    </div>

    <div class="flex gap-2 mt-5">
      <Input placeholder="Add a caption" name="caption" id="caption" />
      <Button
        on:click={handleUploadFile}
        isLoading={isUploading}
        class="min-w-fit"
      >
        Upload
        {#if !isUploading}
          <img src="/icons/upload-light.svg" alt="Upload" class="w-3.5 h-3.5" />
        {/if}
      </Button>
    </div>
  </Modal>
{/if}
