<script>
  import ActionIconLink from "$lib/ui/ActionIconLink.svelte";
</script>

<footer
  class="flex justify-between items-center py-4 px-2 mx-auto mt-20 w-screen max-w-screen-lg sm:px-4"
>
  <div class="flex gap-1 items-center text-sm xs:gap-2 xs:text-base">
    <img src="/boble.svg" alt="BOBLE logo" class="w-6 h-6 xs:w-8 xs:h-8" />
    <h1 class="font-black tracking-wide">BOBLE</h1>
  </div>

  <p class="text-xs font-medium xs:text-sm text-zinc-400">
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
