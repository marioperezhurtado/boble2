<script lang="ts">
  import { page } from "$app/stores";
  import { formatDateTime } from "$lib/utils/date";
  import { generateIdenticon } from "$lib/utils/identicon";
  import type { PageData } from "../../$types";

  $: data = $page.data as PageData;
  $: chat = data.chat;
  $: user = data.chat.user;
</script>

<div class="flex flex-col items-center relative bg-white">
  <img
    src={user.image ?? generateIdenticon(user.email)}
    alt="User avatar"
    class="aspect-square w-full bg-white"
  />
  <div
    class="absolute flex items-end justify-between bottom-0 left-0 w-full h-20
    bg-gradient-to-t to-transparent from-black/40 text-white text-left px-4 pb-2"
  >
    <div>
      <h2 class="pt-2 font-semibold">{user.alias ?? user.name}</h2>
      <p class="text-sm text-zinc-100">{user.email}</p>
    </div>

    <div class="pb-1">
      {#if user.alias}
        <a
          title="Edit contact"
          href="/contacts/{user.id}?editContact={user.id}"
        >
          <img src="/icons/edit-light.svg" alt="Edit contact" class="w-7 h-7" />
        </a>
      {:else}
        <a
          title="Add contact"
          href="/contacts?createContact&email={user.email}"
        >
          <img
            src="/icons/add-contact-light.svg"
            alt="Add contact"
            class="w-7 h-7"
          />
        </a>
      {/if}
    </div>
  </div>
</div>

<div class="flex flex-col gap-4 px-4 pt-4">
  <div>
    <p class="text-xs text-zinc-500">Full name</p>
    <p class="text-sm font-medium">{user.name}</p>
  </div>

  {#if user.status}
    <div>
      <p class="text-xs text-zinc-500">Status</p>
      <p class="text-sm font-medium">{user.status}</p>
    </div>
  {/if}

  <div>
    <p class="text-xs text-zinc-500">Last read</p>
    <p class="text-sm font-medium">
      {#if user.lastReadAt}
        {formatDateTime(user.lastReadAt)}
      {:else if chat.createdAt}
        {formatDateTime(chat.createdAt)}
      {/if}
    </p>
  </div>
</div>
