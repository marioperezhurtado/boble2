<script lang="ts">
  import { formatFileSize } from "$lib/utils/file";
  import { formatDateShort } from "$lib/utils/date";
  import type { RouterOutputs } from "$lib/trpc/shared";

  type Message = RouterOutputs["message"]["getMediaMessages"][number];

  export let messages: Message[];
</script>

<ul class="flex flex-col gap-4 py-4 px-3">
  {#each messages as message}
    {#if message.documentInfo}
      <li>
        <button class="flex gap-2 items-center w-full text-left rounded-md">
          <img
            src="/icons/document.svg"
            alt="Document icon"
            class="-ml-1 w-8 h-8"
          />
          <div class="flex-1">
            <p class="text-xs font-medium break-all">
              {message.documentInfo.name.split(".").shift()}
            </p>
            <p class="mt-0.5 text-xs uppercase">
              {#if message.documentInfo.name.includes(".")}
                {message.documentInfo.name.split(".").pop()} ·{" "}
              {/if}
              {formatFileSize(message.documentInfo.size)}
            </p>
          </div>
        </button>
        <p class="text-xs text-right">
          {formatDateShort(new Date(message.createdAt))}
        </p>
      </li>
    {/if}
  {/each}
</ul>
