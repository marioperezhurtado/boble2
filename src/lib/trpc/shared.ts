import { env } from "$env/dynamic/public";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "$lib/trpc/server/root";

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (env.PUBLIC_SITE_URL) return `https://${env.PUBLIC_SITE_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function getUrl() {
  return getBaseUrl() + "/api/trpc";
}

/**
 * Inference helper for inputs.
 *
 * @example type HelloInput = RouterInputs['example']['hello']
 */
export type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helper for outputs.
 *
 * @example type HelloOutput = RouterOutputs['example']['hello']
 */
export type RouterOutputs = inferRouterOutputs<AppRouter>;
