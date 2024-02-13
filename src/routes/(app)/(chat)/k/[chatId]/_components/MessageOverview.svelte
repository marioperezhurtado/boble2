<script lang="ts">
  import { page } from "$app/stores";
  import { getFileUrl } from "$lib/utils/url";
  import { formatMinuteSeconds } from "$lib/utils/date";
  import type { PageData } from "../$types";
  import type { Message } from "$lib/db/message/getMessages";

  export let message: Message;
  export let isOwn: boolean;

  $: data = $page.data as PageData;
</script>

<div
  class={`rounded text-xs border-l-4 flex justify-between overflow-hidden
      flex-grow
      ${
        isOwn ? "bg-cyan-600/10 border-cyan-600" : "bg-zinc-100 border-zinc-300"
      }`}
>
  <div class="py-1.5 px-2.5">
    <p class="font-semibold">
      {#if isOwn}
        You
      {:else}
        {data.chat.user.alias || data.chat.user.name}
      {/if}
    </p>

    <div class="flex gap-0.5 items-center mt-0.5 text-zinc-600">
      {#if message.type === "image"}
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img
          src="/icons/camera.svg"
          alt="Photo icon"
          class="mr-0.5 w-3.5 h-3.5"
        />
        <p class="break-all max-w-[36ch] text-ellipsis line-clamp-1">
          {message.text || "Photo"}
        </p>
      {:else if message.type === "video"}
        <img src="/icons/video.svg" alt="Video icon" class="mr-0.5 w-4 h-4" />
        <p class="break-all max-w-[36ch] text-ellipsis line-clamp-1">
          {message.text || "Video"}
        </p>
      {:else if message.type === "audio"}
        <img
          src="/icons/microphone.svg"
          alt="Audio icon"
          class="mr-0.5 w-4 h-4"
        />
        {#if message.audioInfo?.duration}
          <span>{formatMinuteSeconds(message.audioInfo.duration)}</span>
        {:else}
          <span>Audio</span>
        {/if}
      {:else if message.type === "document"}
        <img
          src="/icons/document.svg"
          alt="Document icon"
          class="mr-0.5 w-4 h-4"
        />
        <p class="break-all max-w-[36ch] text-ellipsis line-clamp-1">
          {message.text || message.documentInfo?.name || "Document"}
        </p>
      {:else if message.type === "gif"}
        <img src="/icons/gif.svg" alt="GIF icon" class="mr-0.5 w-4 h-4" />
        <span>GIF</span>
      {:else if message.type === "sticker"}
        <img
          src="/icons/sticker.svg"
          alt="Sticker icon"
          class="mr-0.5 w-4 h-4"
        />
        <span>Sticker</span>
      {:else if message.type === "link"}
        <img src="/icons/link.svg" alt="Link icon" class="mr-0.5 w-3.5 h-3.5" />
        <p class="break-all max-w-[36ch] text-ellipsis line-clamp-1">
          {message.text}
        </p>
      {:else if message.type === "location"}
        <img
          src="/icons/location.svg"
          alt="Location icon"
          class="mr-0.5 w-3.5 h-3.5"
        />
        <span
          class="break-all line-clamp-1 overflow-ellipsis"
          title={message.text ?? ""}
        >
          {message.text || "Location"}
        </span>
      {:else}
        <p class="break-all max-w-[36ch] text-ellipsis line-clamp-1">
          {message.text}
        </p>
      {/if}
    </div>
  </div>

  {#if message?.type === "image"}
    <img
      src={getFileUrl(message.source ?? "")}
      alt="Reply to"
      class="object-cover w-[46px] h-[46px] bg-zinc-100"
    />
  {:else if message?.type === "video"}
    <video class="object-cover w-[46px] h-[46px]" muted>
      <source src={getFileUrl(message.source ?? "")} />
    </video>
  {:else if message?.type === "gif"}
    <video class="object-cover w-[46px] h-[46px]" muted>
      <source src={message.text} />
    </video>
  {:else if message?.type === "sticker"}
    <img
      src={message.text ?? ""}
      alt="Reply to"
      class="object-cover w-[46px] h-[46px]"
    />
  {:else if message?.type === "link" && message.linkPreview?.image}
    <img
      src={message.linkPreview.image}
      alt="Reply to"
      class="object-cover w-[46px] h-[46px] bg-zinc-100"
    />
  {/if}
</div>
