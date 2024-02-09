<script lang="ts">
  export let title = "Boble Web Chat";
  export let description =
    "Real-time web chat. Chat with your friends and family from any device.";
  export let ogImage = "/social-image.webp";
</script>

<svelte:head>
  <link rel="icon" href="/favicon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
    rel="stylesheet"
  />
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="author" content="Mario Pérez Hurtado" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:url" content="https://boble.chat" />
  <meta property="og:type" content="website" />

  <slot />
</svelte:head>
