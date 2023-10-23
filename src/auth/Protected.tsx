import { Show, type Component } from "solid-js";
import { useRouteData } from "solid-start";
import { createServerData$, redirect } from "solid-start/server";
import { getServerSession } from "./auth";
import { type Session } from "@auth/core/types";

type ProtectedComponent = Component<Session>;

// Redirect if user is NOT logged in
export function Protected(Comp: ProtectedComponent) {
  const routeData = () => {
    return createServerData$(
      async (_, event) => {
        const session = await getServerSession(event.request);
        const fromUrl = new URL(event.request.url);

        if (!session || !session.user) {
          throw redirect(handleLoginRedirect(fromUrl));
        }
        return session;
      },
    );
  };

  return {
    routeData,
    Page: () => {
      const session = useRouteData<typeof routeData>();
      return (
        <Show when={session()} keyed>
          {(sess) => <Comp {...sess} />}
        </Show>
      );
    },
  };
};

function handleLoginRedirect(url: URL) {
  return `/login?redirectTo=${url.pathname + url.search}`;
}

// Redirect if user IS logged in
export function AuthProtected(Comp: Component) {
  const routeData = () => {
    return createServerData$(
      async (_, event) => {
        const session = await getServerSession(event.request);
        const fromUrl = new URL(event.request.url);
        const redirectTo = fromUrl.searchParams.get("redirectTo");

        if (session && session.user) {
          throw redirect(redirectTo || "/");
        }
        return session;
      },
    );
  };

  return {
    routeData,
    Page: () => {
      const session = useRouteData<typeof routeData>();
      return (
        <Show when={!session()} keyed>
          <Comp />
        </Show>
      );
    },
  };
};
