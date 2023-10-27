import { useRouteData, useParams, RouteDataArgs } from "solid-start";
import { MessageList } from "~/components/MessageList";
import { SendMessage } from "~/components/SendMessage";
import { createServerData$, createServerAction$ } from "solid-start/server";
import { getMessages } from "~/db/getMessages";
import { readChat } from "~/db/readChat";
import { getServerSession } from "~/auth/auth";
import { createEffect } from "solid-js";
import type { routeData as parentRouteData } from "../chat";

export function routeData({ params }: RouteDataArgs) {
  const messages = createServerData$(
    ([, chatId]) => getMessages(chatId),
    { key: () => ["chatId", params.chatId] });

  const session = createServerData$(async (_, event) => getServerSession(event.request));

  const chats = useRouteData<typeof parentRouteData>();

  return { messages, session, chats };
}

export default function ChatPage() {
  const params = useParams<{ chatId: string }>();
  const data = useRouteData<typeof routeData>();
  const chat = data.chats()?.find((chat) => chat.id === params.chatId);

  const [, read] = createServerAction$(async (chatId: string, { request }) => {
    const session = await getServerSession(request);
    if (!session) return;
    await readChat(chatId.toString(), session.id);
  });

  createEffect(() => read(params.chatId));

  return (
    <>
      <MessageList
        initialMessages={data.messages() ?? []}
        lastReadAt={chat?.lastReadAt ?? new Date(0)}
        chatId={params.chatId}
        userId={data.session()?.id!}
      />
      <SendMessage chatId={params.chatId} />
    </>
  );
};
