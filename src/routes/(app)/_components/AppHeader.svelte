<script lang="ts">
  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
  import type { LayoutData } from "../$types";

  const data = $page.data as LayoutData;
</script>

<header class="w-full text-cyan-50 bg-cyan-900">
  <div class="flex justify-between items-center px-4 mx-auto max-w-screen-2xl">
    <a href="/chat" class="flex gap-1 items-center py-2.5">
      <img
        src="/icons/boble-light.svg"
        alt="BOBLE logo"
        class="w-5 h-5"
        height="20"
        width="20"
      />
      <h1 class="text-lg font-bold tracking-wide">
        BOBLE
        <span class="px-1 text-xs text-cyan-50 bg-cyan-600 rounded-sm">BETA</span>
      </h1>
    </a>
    <nav>
      <ul class="flex gap-2.5 text-sm">
        <li>
          <a
            href="/profile"
            class="flex gap-1.5 items-center py-1 px-2 bg-cyan-700 rounded-md border-t shadow-sm border-t-cyan-600 aspect-square xs:aspect-auto"
          >
            <span class="sr-only xs:not-sr-only">{data.user.name}</span>
            <img
              src="/icons/profile.svg"
              alt="Profile"
              class="w-4 h-4 xs:w-3.5 xs:h-3.5"
            />
          </a>
        </li>
        <li>
          <form action="/?/logout" method="POST" use:enhance>
            <button
              class="flex gap-1.5 items-center py-1 px-2 bg-cyan-700 rounded-md border-t shadow-sm border-t-cyan-600 aspect-square xs:aspect-auto"
            >
              <span class="sr-only xs:not-sr-only">Logout</span>
              <img
                src="/icons/logout.svg"
                alt="logout"
                class="w-4 h-4 xs:w-3.5 xs:h-3.5"
              />
            </button>
          </form>
        </li>
      </ul>
    </nav>
  </div>
</header>
