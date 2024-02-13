<script>
  import { QueryClientProvider } from "@tanstack/svelte-query";
  import { queryClient, trpc } from "$lib/trpc/client";

  trpc.setContext(trpc.client, queryClient);
</script>

<QueryClientProvider client={queryClient}>
  <slot />
</QueryClientProvider>
