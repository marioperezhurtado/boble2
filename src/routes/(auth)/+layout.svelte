<script lang="ts">
  import Header from "$lib/ui/Header.svelte";
  import Footer from "$lib/ui/Footer.svelte";
</script>

<div class="flex flex-col h-screen">
  <Header />
  <main
    class="flex flex-col flex-grow gap-14 justify-center items-center px-4 pt-10 lg:flex-row lg:gap-10 lg:items-start lg:pt-20"
  >
    <section
      class="flex flex-col justify-center p-6 w-full max-w-md bg-white rounded-md border shadow-md"
    >
      <slot />
    </section>
    <section class="flex gap-3 w-full max-w-md lg:pt-6">
      <img src="/boble.svg" alt="Boble logo" class="w-12 h-12" />
      <div>
        <h1 class="text-lg font-bold">
          <span class="tracking-wide uppercase">Boble </span>
          Web Chat
        </h1>
        <p class="pt-1 text-sm">
          Chat with your friends and family from any device.
        </p>
      </div>
    </section>
  </main>

  <Footer />
</div>
