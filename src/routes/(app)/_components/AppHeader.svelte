<script lang="ts">
  import { page } from "$app/stores";
  import type { LayoutData } from "../$types";

  const data = $page.data as LayoutData;
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
              class="w-5 h-5 xs:w-4 xs:h-4"
            />
          </a>
        </li>
        <li>
          <a
            href="/logout"
            class="flex gap-1.5 items-center py-1 px-2 bg-cyan-700 rounded-md border-t shadow-sm border-t-cyan-600 aspect-square xs:aspect-auto"
          >
            <span class="sr-only xs:not-sr-only">Logout</span>
            <img
              src="/icons/logout.svg"
              alt="logout"
              class="w-5 h-5 translate-x-px xs:w-4 xs:h-4"
            />
          </a>
        </li>
      </ul>
    </nav>
  </div>
</header>
