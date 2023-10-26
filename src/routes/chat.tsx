import { useRouteData, Title, Outlet } from "solid-start";
import { Header } from "~/components/Header";
import { ChatList } from "~/components/ChatList";
import { createServerData$, redirect } from "solid-start/server";
import { getChats } from "~/db/getChats";
import { getServerSession } from "~/auth/auth";

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

  return (
    <div class="flex flex-col h-screen bg-zinc-200">
      <Header />
      <main class="flex flex-grow mx-auto w-full max-w-screen-xl bg-zinc-200 border-x border-zinc-300">
        <Title>BOBLE Web Chat</Title>
        <ChatList chats={chats()!} />
        <div class="flex flex-col w-full h-full border-l">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
