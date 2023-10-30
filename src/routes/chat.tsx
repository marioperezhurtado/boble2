import { useRouteData, Title, Outlet, useParams } from "solid-start";
import { createServerData$, redirect } from "solid-start/server";
import { getChats } from "~/db/getChats";
import { getServerSession } from "~/auth/auth";
import { ChatList } from "~/components/ChatList";
import { Header } from "~/components/Header";

export function routeData() {
  return createServerData$(async (_, event) => {
    const session = await getServerSession(event.request);
    if (!session) {
      throw redirect("/login");
    }
    return getChats(session.id);
  });
}

export default function ChatLayout() {
  const chats = useRouteData<typeof routeData>();
  const params = useParams<{ chatId: string }>();

  return (
    <>
      <div class="flex flex-col h-screen bg-zinc-200">
        <Title>BOBLE Web Chat</Title>
        <Header />
        <main class="flex flex-grow mx-auto w-full max-w-screen-xl md:overflow-hidden bg-zinc-200 border-x border-zinc-300">
          <div
            class="w-full md:block md:max-w-sm bg-zinc-50"
            classList={{
              "hidden": !!params.chatId
            }}
          >
            <ChatList chats={chats()!} />
          </div>
          <div
            class="flex-col w-full border-l md:flex h-full"
            classList={{
              "hidden": !params.chatId
            }}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};
