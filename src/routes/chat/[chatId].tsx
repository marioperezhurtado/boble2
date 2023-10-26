import { useRouteData, useParams, RouteDataArgs } from "solid-start";
import { MessageList } from "~/components/MessageList";
import { SendMessage } from "~/components/SendMessage";
import { createServerData$ } from "solid-start/server";
import { getMessages } from "~/db/getMessages";

export function routeData({ params }: RouteDataArgs) {
  return createServerData$(
    ([, chatId]) => getMessages(chatId),
    { key: () => ["chatId", params.chatId] });
}

export default function ChatPage() {
  const params = useParams<{ chatId: string }>();
  const savedMessages = useRouteData<typeof routeData>();

  return (
    <>
      <MessageList initialMessages={savedMessages() ?? []} chatId={params.chatId} />
      <SendMessage chatId={params.chatId} />
    </>
  );
};


