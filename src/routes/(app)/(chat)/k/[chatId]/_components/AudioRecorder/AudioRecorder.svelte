<script lang="ts">
  import { page } from "$app/stores";
  import { trpc } from "$lib/trpc/client";
  import { onMount } from "svelte";
  import { scale } from "svelte/transition";
  import { replyingTo } from "$lib/stores/store";
  import { uploadFileFromClient } from "$lib/utils/file";
  import { VOLUME_SPIKE_COUNT, summarizeVolumeSpikes } from "./volumeSpikes";
  import { encryptMessageField } from "$lib/utils/encryption";
  import { sendMessage } from "$lib/socket/client";
  import TimeElapsed from "./TimeElapsed.svelte";
  import VolumeMeter from "./VolumeMeter.svelte";
  import AccessDeniedModal from "./AccessDeniedModal.svelte";
  import DeviceNotFoundModal from "./DeviceNotFoundModal.svelte";

  export let onClose: () => void;

  let chunks: BlobPart[] = [];
  let mediaRecorder: MediaRecorder | null = null;
  let speechRecognition: SpeechRecognition | null = null;
  let audioBlob: Blob | null = null;
  let transcript: string | null = null;

  let volumeSpikes = new Array(VOLUME_SPIKE_COUNT).fill(0);

  let accessDenied = false;
  let deviceNotFound = false;
  let timeElapsed = 0;

  function handleStop() {
    speechRecognition?.stop();
    mediaRecorder?.stop();
  }

  const sendAudio = trpc.message.sendAudio.createMutation({
    onSuccess: () => {
      $replyingTo = null;
      onClose();
    },
  });

  const createPresignedPost = trpc.createPresignedPost.audio.createMutation();

  $: if (audioBlob) handleSendAudio();

  async function handleSendAudio() {
    if (!audioBlob) return;

    const audioFile = new File([audioBlob], "audio");

    const presignedPostData = await $createPresignedPost.mutateAsync();

    try {
      await uploadFileFromClient({
        file: audioFile,
        presignedPostData,
      });
    } catch (e) {
      $replyingTo = null;
      onClose();
      return;
    }

    const [encryptedAudioId, encryptedTranscript] = await Promise.all([
      encryptMessageField(presignedPostData.fields.key, $page.params.chatId),
      encryptMessageField(transcript, $page.params.chatId),
    ]);

    const newMessage = await $sendAudio.mutateAsync({
      audioId: encryptedAudioId,
      transcript: encryptedTranscript,
      chatId: $page.params.chatId,
      replyToId: $replyingTo?.id ?? "",
      duration: timeElapsed,
      volumeSpikes: summarizeVolumeSpikes(
        volumeSpikes.slice(VOLUME_SPIKE_COUNT),
      ),
    });

    sendMessage({
      ...newMessage,
      createdAt: new Date(newMessage.createdAt),
      imageInfo: null,
      videoInfo: null,
      linkPreview: null,
      documentInfo: null,
    });
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
        chunks = [];
      };

      mediaRecorder.start();
    } catch (e) {
      if ((e as DOMException).name === "NotFoundError") {
        deviceNotFound = true;
        return;
      }
      accessDenied = true;
    }
  }

  function setupSpeechRecognition() {
    try {
      if (window.webkitSpeechRecognition) {
        speechRecognition = new webkitSpeechRecognition();
      } else {
        speechRecognition = new SpeechRecognition();
      }

      speechRecognition.interimResults = true;
      speechRecognition.continuous = true;

      speechRecognition.onresult = (e) => {
        transcript = e.results[0][0].transcript;
      };

      speechRecognition.start();
    } catch (e) {}
  }

  onMount(() => {
    setupRecorder();
    setupSpeechRecognition();

    return () => {
      mediaRecorder?.stop();
      speechRecognition?.stop();
    };
  });
</script>

<div class="flex gap-5 justify-center items-center h-14">
  {#if accessDenied}
    <img in:scale src="/icons/block.svg" alt="Access denied" class="w-9 h-9" />
    <AccessDeniedModal {onClose} />
  {:else if deviceNotFound}
    <img
      in:scale
      src="/icons/block.svg"
      alt="Microphone not found"
      class="w-9 h-9"
    />
    <DeviceNotFoundModal {onClose} />
  {:else if mediaRecorder?.stream}
    <button
      on:click={onClose}
      class="flex justify-center items-center h-10 rounded-full border transition bg-zinc-100 min-w-10 hover:bg-zinc-200 hover:border-zinc-300"
    >
      <img
        src="/icons/delete.svg"
        alt="Delete icon"
        class="w-[24px] h-[24px]"
      />
    </button>

    <TimeElapsed bind:timeElapsed />

    <VolumeMeter stream={mediaRecorder.stream} bind:volumeSpikes />

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
