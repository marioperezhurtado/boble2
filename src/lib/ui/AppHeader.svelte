<script lang="ts">
  import { trpc } from "$lib/trpc/client";
  import { goto } from "$app/navigation";
  import type { User } from "lucia";
  import Button from "$lib/ui/Button.svelte";
  import ButtonLink from "$lib/ui/ButtonLink.svelte";

  export let user: User;

  const logout = trpc.auth.logout.createMutation({
    onSuccess: () => goto("/login"),
  });

  function handleLogout() {
    $logout.mutate();
  }
</script>

<header class="w-full text-cyan-50 bg-cyan-900">
  <div
    class="flex justify-between items-center px-2 mx-auto max-w-screen-2xl xl:px-4"
  >
    <a href="/k" class="flex gap-1 items-center py-2.5">
      <img
        src="/icons/boble-light.svg"
        alt="Boble logo"
        class="w-5 h-5"
        height="20"
        width="20"
      />
      <h1 class="text-lg font-bold tracking-wide uppercase">
        Boble
        <span class="px-1 text-xs text-cyan-50 bg-cyan-600 rounded-sm">
          Beta
        </span>
      </h1>
    </a>
    {#if user}
      <nav>
        <ul class="flex gap-2.5 text-sm">
          <li>
            <ButtonLink href="/profile" class="bg-cyan-700 border-cyan-700">
              <img
                src="/icons/profile.svg"
                alt="Profile"
                class="w-[18px] h-[18px]"
              />
            </ButtonLink>
          </li>
          <li>
            <Button on:click={handleLogout} class="bg-cyan-700 border-cyan-700">
              <img
                src="/icons/logout.svg"
                alt="logout"
                class="w-[18px] h-[18px] translate-x-px"
              />
            </Button>
          </li>
        </ul>
      </nav>
    {/if}
  </div>
</header>
