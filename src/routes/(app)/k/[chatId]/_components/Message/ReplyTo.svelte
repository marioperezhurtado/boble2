<script lang="ts">
  import { page } from "$app/stores";
  import { getFileUrl } from "$lib/utils/url";
  import { formatMinuteSeconds } from "$lib/utils/date";
  import type { PageData } from "../../$types";
  import type { Message } from "$lib/db/message/getMessages";
  import Image from "$lib/ui/Image.svelte";

  export let isOwn: boolean;
  export let replyTo: Message | null;

  $: data = $page.data as PageData;
</script>

<a
  href="#{replyTo?.id ?? ''}"
  class={`mb-1 rounded text-xs border-l-4 flex justify-between overflow-hidden
      ${isOwn ? "bg-cyan-800 text-zinc-100" : "bg-zinc-100 border-zinc-300"}`}
>
  <div class="py-1.5 px-2.5">
    {#if replyTo}
      <p class="font-semibold">
        {#if replyTo.senderId === data.chat.user.id}
          {data.chat.user.alias || data.chat.user.name}
        {:else}
          You
        {/if}
      </p>

      <div class="flex gap-0.5 items-center mt-0.5">
        {#if replyTo.type === "image"}
          <!-- svelte-ignore a11y-img-redundant-alt -->
          <img
            src={isOwn ? "/icons/camera-light.svg" : "/icons/camera.svg"}
            alt="Photo icon"
            class="mr-0.5 w-3.5 h-3.5"
          />
          <p class="break-all max-w-[36ch] text-ellipsis line-clamp-1">
            {replyTo.text || "Photo"}
          </p>
        {:else if replyTo.type === "video"}
          <img
            src={isOwn ? "/icons/video-light.svg" : "/icons/video.svg"}
            alt="Video icon"
            class="mr-0.5 w-4 h-4"
          />
          <p class="break-all max-w-[36ch] text-ellipsis line-clamp-1">
            {replyTo.text || "Video"}
          </p>
        {:else if replyTo.type === "audio"}
          <img
            src={isOwn
              ? "/icons/microphone-light.svg"
              : "/icons/microphone.svg"}
            alt="Audio icon"
            class="mr-0.5 w-4 h-4"
          />
          {#if replyTo.audioInfo?.duration}
            <span>{formatMinuteSeconds(replyTo.audioInfo.duration)}</span>
          {:else}
            <span>Audio</span>
          {/if}
        {:else if replyTo.type === "document"}
          <img
            src={isOwn ? "/icons/document-light.svg" : "/icons/document.svg"}
            alt="Document icon"
            class="mr-0.5 w-4 h-4"
          />
          <span>{replyTo.text || replyTo.documentInfo?.name || "Document"}</span
          >
        {:else if replyTo.type === "gif"}
          <img
            src={isOwn ? "/icons/gif-light.svg" : "/icons/gif.svg"}
            alt="GIF icon"
            class="mr-0.5 w-4 h-4"
          />
          <span>GIF</span>
        {:else if replyTo.type === "sticker"}
          <img
            src={isOwn ? "/icons/sticker-light.svg" : "/icons/sticker.svg"}
            alt="Sticker icon"
            class="mr-0.5 w-4 h-4"
          />
          <span>Sticker</span>
        {:else if replyTo.type === "link"}
          <img
            src={isOwn ? "/icons/link-light.svg" : "/icons/link.svg"}
            alt="Link icon"
            class="mr-0.5 w-3.5 h-3.5"
          />
          <p class="break-all max-w-[36ch] text-ellipsis line-clamp-1">
            {replyTo.text}
          </p>
        {:else}
          <p class="break-all max-w-[36ch] text-ellipsis line-clamp-1">
            {replyTo.text}
          </p>
        {/if}
      </div>
    {:else}
      <p>Original message was deleted</p>
    {/if}
  </div>

  {#if replyTo?.type === "image"}
    <Image
      src={getFileUrl(replyTo.source ?? "")}
      alt="Reply to"
      class="object-cover w-[46px] h-[46px] bg-zinc-100"
    />
  {:else if replyTo?.type === "video"}
    <video class="object-cover w-[46px] h-[46px]" muted>
      <source src={getFileUrl(replyTo.source ?? "")} />
    </video>
  {:else if replyTo?.type === "gif"}
    <video class="object-cover w-[46px] h-[46px]" muted>
      <source src={replyTo.text} type="image/gif" />
    </video>
  {:else if replyTo?.type === "sticker"}
    <Image
      src={replyTo.text ?? ""}
      alt="Reply to"
      class="object-cover w-[46px] h-[46px]"
    />
  {:else if replyTo?.type === "link" && replyTo.linkPreview?.image}
    <Image
      src={replyTo.linkPreview.image}
      alt="Reply to"
      class="object-cover w-[46px] h-[46px] bg-zinc-100"
    />
  {/if}
</a>
