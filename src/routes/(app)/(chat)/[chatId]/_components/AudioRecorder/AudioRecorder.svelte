<script lang="ts">
  import { onMount } from "svelte";
  import { scale } from "svelte/transition";
  import { replyingTo } from "../stores";
  import TimeElapsed from "./TimeElapsed.svelte";
  import VolumeMeter from "./VolumeMeter.svelte";
  import Modal from "$lib/ui/Modal.svelte";
  import Button from "$lib/ui/Button.svelte";

  export let onClose: () => void;

  let chunks: BlobPart[] = [];
  let mediaRecorder: MediaRecorder | null = null;
  let audioBlob: Blob | null = null; let audioUrl: string | null = null;
  let isUploading = false;

  let accessDenied = false;
  let deviceNotFound = false;

  function handleStart() {
    mediaRecorder?.start();
  }

  function handleStop() {
    mediaRecorder?.stop();
  }

  function handleDelete() {
    mediaRecorder?.stop();
    audioUrl = null;
    onClose();
  }

  $: if (audioBlob) handleSend();

  async function handleSend() {
    if (!audioBlob) return;

    const formData = new FormData();
    const audioFile = new File([audioBlob], "audio", { type: "audio/ogg" });
    formData.append("audio", audioFile);
    formData.append("replyToId", $replyingTo?.id ?? "");

    isUploading = true;

    await fetch(`?/sendAudio`, {
      method: "POST",
      body: formData,
    });

    isUploading = false;
    $replyingTo = null;
    onClose();
  }

  async function setupRecorder() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/ogg" });
        audioBlob = blob;
        audioUrl = URL.createObjectURL(blob);
        chunks = [];
      };

      handleStart();
    } catch (e) {
      if ((e as DOMException).name === "NotFoundError") {
        deviceNotFound = true;
        return;
      }
      accessDenied = true;
    }
  }

  onMount(() => setupRecorder());
</script>

<div class="flex gap-5 justify-center items-center h-14">
  {#if accessDenied}
    <img in:scale src="/icons/block.svg" alt="Access denied" class="w-9 h-9" />

    <Modal title="Unable to access microphone" {onClose}>
      <p class="text-sm text-zinc-500">
        You need to grant access to your microphone to send voice messages.
      </p>
      <Button on:click={onClose} class="mt-5 ml-auto">Close</Button>
    </Modal>
  {:else if deviceNotFound}
    <img
      in:scale
      src="/icons/block.svg"
      alt="Microphone not found"
      class="w-9 h-9"
    />

    <Modal title="Microphone not found" {onClose}>
      <div class="flex flex-col gap-2 text-sm text-zinc-500">
        <p>No microphone was found on your device.</p>
        <p>Please make sure you have a microphone connected and try again.</p>
        <Button on:click={onClose} class="mt-5 ml-auto">Close</Button>
      </div></Modal
    >
  {:else if mediaRecorder?.stream}
    <button
      on:click={handleDelete}
      class="flex justify-center items-center h-10 rounded-full border transition bg-zinc-100 min-w-10 hover:bg-zinc-200 hover:border-zinc-300"
    >
      <img
        src="/icons/delete.svg"
        alt="Delete icon"
        class="w-[24px] h-[24px]"
      />
    </button>

    <TimeElapsed />

    <VolumeMeter stream={mediaRecorder.stream} />

    <button
      on:click={handleStop}
      class="block w-10 h-10 bg-cyan-600 rounded-full transition hover:brightness-110"
    >
      <img
        src="/icons/send-light.svg"
        alt="Send icon"
        class="w-5 h-5 ml-[11px]"
      />
    </button>
  {/if}
</div>
