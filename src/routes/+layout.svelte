<script>
  import "../app.css";
  import { QueryClientProvider } from "@tanstack/svelte-query";
  import { queryClient, trpc } from "$lib/trpc/client";

  trpc.setContext(trpc.client, queryClient);
</script>

<svelte:head>
  <link rel="icon" href="/favicon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap"
    rel="stylesheet"
  />
  <title>Boble Web Chat</title>
  <meta
    name="description"
    content="Real-time web chat. Chat with your friends and family from any device."
  />
  <meta name="author" content="Mario Pérez Hurtado" />
</svelte:head>

<QueryClientProvider client={queryClient}>
  <slot />
</QueryClientProvider>
