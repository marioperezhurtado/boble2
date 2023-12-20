<script lang="ts">
  import { enhance } from "$app/forms";
  import { replyingTo } from "../stores";
  import Button from "$lib/ui/Button.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import Input from "$lib/ui/Input.svelte";

  let selectedImage: File | null = null;
  let imageInput: HTMLInputElement;
  let isUploading = false;

  function openImagePicker() {
    imageInput.click();
  }

  function handleClose() {
    imageInput.value = "";
    selectedImage = null;
  }
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
      handleClose();
    };
  }}
  class="flex"
>
  <input type="hidden" name="replyToId" value={$replyingTo?.id ?? null} />

  <button
    on:click={openImagePicker}
    type="button"
    title="Upload image"
    aria-label="Upload image"
    class="p-0.5 rounded-md min-w-fit focus:outline-cyan-600"
  >
    <img src="/icons/camera.svg" alt="Upload" class="w-7 h-7" />
  </button>

  <input
    bind:this={imageInput}
    on:input={() => (selectedImage = imageInput?.files?.[0] ?? null)}
    type="file"
    name="image"
    accept="image/*"
    hidden
  />

  {#if selectedImage}
    <Modal title="Upload image" onClose={handleClose}>
      <div class="p-2 w-full h-56 rounded-md border bg-zinc-100">
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="Upload preview"
          class="object-contain mx-auto w-full h-full"
        />
      </div>

      <div class="flex gap-2 mt-5">
        <Input
          placeholder="Add a description"
          name="description"
          id="description"
        />
        <Button type="submit" class="min-w-fit">
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
