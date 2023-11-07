<script>
    import Highlighted from "./Highlighted.svelte";
  import Step from "./Step.svelte";
</script>

<section class="pt-40 text-center">
  <div>
    <h2 class="text-4xl font-extrabold leading-snug">
      As easy as
      <Highlighted>one, two, three!</Highlighted>
    </h2>
    <p class="pt-5 mx-auto max-w-md font-medium text-zinc-500">
      Simple and intuitive user experience to chat quickly and easily
      without any hassle.
    </p>
  </div>
  <div class="grid grid-cols-3 gap-10 pt-20">
    <Step
      step={1}
      title="Create your account."
      description="You will only need an email address. Fast, easy and free."
    />
    <Step
      step={2}
      title="Join a chat with a friend."
      description="Search his email address or send him an invitation link."
    />
    <Step
      step={3}
      title="Start chatting."
      description="You can send messages, images, GIFs, videos, and more!"
    />
  </div>
</section>
