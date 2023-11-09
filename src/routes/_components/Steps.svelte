<script>
  import Highlighted from "$lib/ui/Highlighted.svelte";
  import Step from "./Step.svelte";

  const STEPS = [
    {
      title: "Create your account.",
      description: "You will only need an email address. Fast, easy and free.",
    },
    {
      title: "Join a chat with a friend.",
      description: "Search his email address or send him an invitation link.",
    },
    {
      title: "Start chatting.",
      description: "You can send messages, images, GIFs, videos, and more!",
    },
  ];
</script>

<section class="px-8 pt-52 mx-auto max-w-screen-lg text-center">
  <div>
    <h2 class="text-4xl font-extrabold leading-snug">
      As easy as
      <Highlighted>one, two, three!</Highlighted>
    </h2>
    <p class="pt-5 mx-auto max-w-md font-medium text-zinc-500">
      Simple and intuitive user experience to chat quickly and easily without
      any hassle.
    </p>
  </div>

  <ol class="grid grid-cols-3 gap-10 pt-24">
    {#each STEPS as { title, description }, i}
      <li class="relative">
        <Step step={i + 1} {title} {description} />
        {#if i !== STEPS.length - 1}
          <img
            src="/icons/dashed-arrow.svg"
            alt="Arrow"
            class="absolute -top-28 w-60 -right-[8.8rem]"
            style="transform: scaleX(-1) rotate(-142deg)"
          />
        {/if}
      </li>
    {/each}
  </ol>
</section>
