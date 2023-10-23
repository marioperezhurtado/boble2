import { Show, type JSX } from "solid-js";
import { signOut } from "@auth/solid-start/client";

export function Header(props: { loggedOut?: boolean }) {
  return (
    <header class="sticky top-0 w-full text-cyan-50 bg-cyan-900">
      <div class="flex justify-between items-center px-4 mx-auto max-w-screen-2xl">
        <a href="/" class="flex gap-1 items-center py-2.5">
          <img src="/icons/boble-light.svg" alt="BOBLE logo" class="w-5 h-5" />
          <h1 class="text-lg font-bold tracking-wide">BOBLE</h1>
        </a>
        <Show when={!props.loggedOut}>
          <nav>
            <ul class="flex gap-2.5 text-sm">
              <li>
                <ButtonLink>
                  <span class="sr-only sm:not-sr-only">example_user</span>
                  <img src="/icons/account.svg" alt="Account" class="sm:w-4 sm:h-4 w-[18px] h-[18px]" />
                </ButtonLink>
              </li>
              <li>
                <ButtonLink onClick={() => signOut()}>
                  <span class="sr-only sm:not-sr-only">Logout</span>
                  <img src="/icons/logout.svg" alt="Logout" class="sm:w-4 sm:h-4 w-[18px] h-[18px]" />
                </ButtonLink>
              </li>
            </ul>
          </nav>
        </Show>
      </div>
    </header>
  );
}

function ButtonLink(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      class="flex gap-2 items-center py-2 pr-2 pl-2.5 text-sm text-cyan-50 bg-cyan-700 rounded-md border border-cyan-700 shadow-md sm:py-1 border-t-cyan-600" />
  );
}
