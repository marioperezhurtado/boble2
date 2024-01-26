import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';
import { svelteQueryWrapper } from 'trpc-svelte-query-adapter';
import { QueryClient } from '@tanstack/svelte-query';
import type { Router } from '$lib/trpc/root';

let browserClient: ReturnType<typeof svelteQueryWrapper<Router>>;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60, // 1 hour
    },
    mutations: {
      retry: false,
    },
  },
});

export function trpc(init?: TRPCClientInit) {
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser && browserClient) {
    return browserClient;
  }

  const client = svelteQueryWrapper<Router>({
    client: createTRPCClient<Router>({ init }),
    queryClient,
  });

  if (isBrowser) {
    browserClient = client;
  }

  return client;
}
