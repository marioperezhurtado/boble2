<script>
  import ActionIconLink from "$lib/ui/ActionIconLink.svelte";
</script>

<footer
  class="flex justify-between items-center p-8 mx-auto mt-24 max-w-screen-lg sm:mt-52"
>
  <div class="flex gap-2 items-center">
    <img src="/boble.svg" alt="BOBLE logo" class="w-8 h-8" />
    <h1 class="font-black tracking-wide">BOBLE</h1>
  </div>

  <p class="text-sm font-medium text-zinc-400">
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
