<script>
  import ActionIconLink from "$lib/ui/ActionIconLink.svelte";
</script>

<footer
  class="flex justify-between items-center px-2 sm:px-4 py-4 mx-auto mt-20 max-w-screen-lg w-screen"
>
  <div class="flex gap-1 xs:gap-2 items-center text-sm xs:text-base">
    <img src="/boble.svg" alt="BOBLE logo" class="xs:w-8 xs:h-8 w-6 h-6" />
    <h1 class="font-black tracking-wide">BOBLE</h1>
  </div>

  <p class="text-xs xs:text-sm font-medium text-zinc-400">
    © {new Date().getFullYear()}
  </p>

  <div class="flex gap-2 items-center">
    <ActionIconLink
      title="Contact"
      href="mailto:marioph10@gmail.com"
      icon="/icons/contact-email.svg"
      target="_blank"
      rel="noopener noreferrer"
    />
    <ActionIconLink
      title="GitHub repository"
      href="https://github.com/marioperezhurtado/boble2"
      icon="/icons/github-dark.svg"
      target="_blank"
      rel="noopener noreferrer"
    />
  </div>
</footer>
