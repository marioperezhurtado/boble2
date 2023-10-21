import { getSession } from "@auth/solid-start";
import { signIn, signOut } from "@auth/solid-start/client";
import { Show } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$ } from "solid-start/server";
import { authOpts } from "./api/auth/[...solidauth]";

export function routeData() {
  return createServerData$(
    async (_, event) => {
      return getSession(event.request, authOpts);
    },
    { key: () => ["auth_user"] }
  );
};

export default function LoginPage() {
  const session = useRouteData<typeof routeData>();

  return (
    <main>
      <div class="flex flex-col justify-center text-center pt-20">
        <h1 class="text-lg font-bold pb-5">Login</h1>
        <Show when={session()?.user}>
          <p>Logged in as {session()?.user?.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </Show>
        <Show when={!session()?.user}>
          <p>You are not logged in.</p>
          <button onClick={() => signIn("github")}>Login with GitHub</button>
        </Show>
      </div>
    </main>
  );
}
