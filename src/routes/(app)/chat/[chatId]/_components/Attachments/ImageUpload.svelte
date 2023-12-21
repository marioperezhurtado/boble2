<script lang="ts">
  import { enhance } from "$app/forms";
  import { replyingTo } from "../stores";
  import Button from "$lib/ui/Button.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import Input from "$lib/ui/Input.svelte";

  export let onClose: () => void;

  let selectedImage: File | null = null;
  let imageInput: HTMLInputElement;
  let isUploading = false;

  function handleOpenImagePicker() {
    imageInput.click();
  }

  $: console.log(selectedImage);
</script>

<form
  method="POST"
  action="?/sendImage"
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
  class="flex"
>
  <input type="hidden" name="replyToId" value={$replyingTo?.id ?? null} />

  <input
    bind:this={imageInput}
    on:input={() => (selectedImage = imageInput?.files?.[0] ?? null)}
    type="file"
    name="image"
    accept="image/*"
    hidden
  />

  <Modal title="Upload image" {onClose}>
    <div class="p-2 w-full h-56 rounded-md border bg-zinc-100">
      {#if !selectedImage}
        <button
          type="button"
          class="flex justify-center items-center w-full h-full"
          on:click={handleOpenImagePicker}
        >
          <img src="/icons/upload.svg" alt="Upload" class="w-7 h-7" />
        </button>
      {:else}
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="Upload preview"
          class="object-contain mx-auto w-full h-full"
        />
      {/if}
    </div>

    <div class="flex gap-2 mt-5">
      <Input
        placeholder="Add a description"
        name="description"
        id="description"
      />
      <Button
        disabled={!selectedImage}
        isLoading={isUploading}
        type="submit"
        class="min-w-fit"
      >
        Upload
        {#if !isUploading}
          <img src="/icons/upload-light.svg" alt="Upload" class="w-3.5 h-3.5" />
        {/if}
      </Button>
    </div>
  </Modal>
</form>
