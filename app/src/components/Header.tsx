import { JSX } from "solid-js";

export function Header() {
  return (
    <header class="sticky top-0 w-full text-cyan-50 bg-cyan-900">
      <div class="flex justify-between items-center py-3 px-4 mx-auto max-w-screen-2xl">
        <a href="/" class="flex gap-1 items-center">
          <img src="/icons/boble-light.svg" alt="BOBLE logo" class="w-5 h-5" />
          <h1 class="text-lg font-bold tracking-wide">BOBLE</h1>
        </a>
        <nav>
          <ul class="flex gap-2.5 text-sm">
            <li>
              <ButtonLink>
                <span class="sr-only sm:not-sr-only">example_user</span>
                <img src="/icons/account.svg" alt="Account" class="w-[18px] h-[18px] sm:w-4 sm:h-4" />
              </ButtonLink>
            </li>
            <li>
              <ButtonLink>
                <span class="sr-only sm:not-sr-only">Log out</span>
                <img src="/icons/logout.svg" alt="Logout" class="w-[18px] h-[18px] sm:w-4 sm:h-4" />
              </ButtonLink>
            </li>
          </ul>
        </nav>
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
