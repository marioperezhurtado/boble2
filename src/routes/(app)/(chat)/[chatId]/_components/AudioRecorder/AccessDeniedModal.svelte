<script lang="ts">
  import Modal from "$lib/ui/Modal.svelte";
  import Button from "$lib/ui/Button.svelte";

  export let onClose: () => void;
</script>

<Modal title="Unable to access microphone" {onClose}>
  <p class="text-sm text-zinc-500">
    You need to grant access to your microphone to send voice messages.
  </p>
  <Button on:click={onClose} class="mt-5 ml-auto">Close</Button>
</Modal>
