import { createTRPCClient, type TRPCClientInit } from 'trpc-sveltekit';
import { svelteQueryWrapper } from 'trpc-svelte-query-adapter';
import type { Router } from '$lib/trpc/root';

let browserClient: ReturnType<typeof svelteQueryWrapper<Router>>;

export function trpc(init?: TRPCClientInit) {
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser && browserClient) {
    return browserClient;
  }

  const client = svelteQueryWrapper<Router>({
    client: createTRPCClient<Router>({ init }),
  });

  if (isBrowser) {
    browserClient = client;
  }

  return client;
}
