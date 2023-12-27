<script lang="ts">
  import { onMount } from "svelte";
  import { replyingTo } from "./stores";

  export let onClose: () => void;

  let chunks: BlobPart[] = [];
  let mediaRecorder: MediaRecorder | null = null;
  let audioBlob: Blob | null = null;
  let audioUrl: string | null = null;
  let state: "inactive" | "recording" | "paused" = "inactive";
  let isUploading = false;

  function handleStart() {
    mediaRecorder?.start();
    state = "recording";
  }

  function handlePause() {
    mediaRecorder?.pause();
    state = "paused";
  }

  function handleResume() {
    mediaRecorder?.resume();
    state = "recording";
  }

  function handleStop() {
    mediaRecorder?.stop();
    state = "inactive";
  }

  function handleDelete() {
    mediaRecorder?.stop();
    audioUrl = null;
    onClose();
  }

  async function handleSend() {
    if (!audioBlob) return;

    const formData = new FormData();
    const audioFile = new File([audioBlob], "audio", { type: "audio/ogg" });
    formData.append("audio", audioFile);
    formData.append("replyingTo", $replyingTo?.id ?? "");

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
      await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e) {
      onClose();
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/ogg" });
      chunks = [];

      audioBlob = blob;
      audioUrl = URL.createObjectURL(blob);
    };

    handleStart();
  }

  onMount(() => setupRecorder()); 
</script>

<div class="flex gap-3 justify-center items-center h-14">
  {#if state === "inactive" && audioUrl}
    <button
      on:click={handleDelete}
      class="flex justify-center items-center w-10 h-10 rounded-full border transition bg-zinc-100 hover:bg-zinc-200 hover:border-zinc-300"
    >
      <img
        src="/icons/delete.svg"
        alt="Delete icon"
        class="w-[24px] h-[24px]"
      />
    </button>

    <audio src={audioUrl} controls></audio>

    <button
      on:click={handleSend}
      class="block w-10 h-10 bg-cyan-600 rounded-full transition hover:brightness-110"
    >
      <img
        src="/icons/send-light.svg"
        alt="Send icon"
        class="w-5 h-5 ml-[11px]"
      />
    </button>
  {:else if state === "recording"}
    <button on:click={handlePause}>Pause</button>
  {:else if state === "paused"}
    <button on:click={handleResume}>Resume</button>
  {/if}

  {#if state !== "inactive"}
    <button on:click={handleStop}>Stop</button>
  {/if}
</div>
