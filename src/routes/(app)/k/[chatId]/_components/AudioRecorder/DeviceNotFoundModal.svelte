<script lang="ts">
  import Modal from "$lib/ui/Modal.svelte";
  import Button from "$lib/ui/Button.svelte";

  export let onClose: () => void;
</script>

<Modal title="Microphone not found" {onClose}>
  <div class="flex flex-col gap-2 text-sm text-zinc-500">
    <p>No microphone was found on your device.</p>
    <p>Please make sure you have a microphone connected and try again.</p>
    <Button on:click={onClose} class="mt-5 ml-auto">Close</Button>
  </div>
</Modal>
