import { createTRPCSvelte } from "@bevm0/trpc-svelte-query";
import { httpBatchLink } from "@trpc/client";
import { getUrl } from "$lib/trpc/shared";
import type { AppRouter } from "$lib/trpc/server/root";
import { QueryClient } from "@tanstack/svelte-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24, // 1 day
    },
    mutations: {
      retry: false,
    },
  },
});

export const trpc = createTRPCSvelte<AppRouter>({
  links: [
    httpBatchLink({ url: getUrl() }),
  ],
});
