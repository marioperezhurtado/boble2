<script>
  import Bubbles from "./_components/Bubbles.svelte";
  import AnyDevice from "./_components/AnyDevice.svelte";
  import Steps from "./_components/Steps.svelte";
  import PrivateChats from "./_components/PrivateChats.svelte";
  import OpenSource from "./_components/OpenSource.svelte";
  import ButtonLink from "$lib/ui/ButtonLink.svelte";
</script>

<main>
  <div class="px-4 mx-auto max-w-screen-lg sm:px-10">
    <div class="flex gap-4 pt-20">
      <Bubbles />
      <div class="pt-2">
        <h1 class="text-3xl font-black tracking-wide">BOBLE</h1>
        <p class="pt-2 text-2xl font-medium text-zinc-500">
          Real-time web chat.
        </p>
        <div class="flex gap-2 pt-5">
          <ButtonLink href="/chat">Start chatting</ButtonLink>
          <ButtonLink
            href="https://github.com/marioperezhurtado/boble2"
            target="_blank"
            rel="noopener noreferrer"
            intent="secondary"
          >
            About this project
          </ButtonLink>
        </div>
      </div>
    </div>

    <AnyDevice />
    <Steps />
    <PrivateChats />
    <OpenSource />

    <section class="mt-40 pb-14 text-center grid grid-cols-3">
      <div class="flex flex-col items-center gap-6">
        <h3 class="text-lg font-bold">Are you ready?</h3>
        <ButtonLink href="/chat">Start chatting</ButtonLink>
      </div>
      <div class="flex flex-col items-center gap-6">
        <h3 class="text-lg font-bold">About this project</h3>
        <ButtonLink
          href="https://github.com/marioperezhurtado/boble2"
          target="_blank"
          rel="noopener noreferrer"
          intent="secondary"
        >
          More info
        </ButtonLink>
      </div>
      <div class="flex flex-col items-center gap-6">
        <h3 class="text-lg font-bold">Any questions?</h3>
        <ButtonLink
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          intent="secondary"
        >
          Contact
        </ButtonLink>
      </div>
    </section>
  </div>
</main>
