export function Header() {
  return (
    <header class="sticky top-0 w-full text-cyan-50 bg-cyan-900">
      <div class="flex justify-between items-center px-4 mx-auto max-w-screen-2xl">
        <a href="/" class="flex gap-1 items-center py-2.5">
          <img src="/icons/boble-light.svg" alt="BOBLE logo" class="w-5 h-5" />
          <h1 class="text-lg font-bold tracking-wide">BOBLE</h1>
        </a>
      </div>
    </header>
  );
}
