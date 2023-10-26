import { useRouteData, useParams, RouteDataArgs } from "solid-start";
import { MessageList } from "~/components/MessageList";
import { SendMessage } from "~/components/SendMessage";
import { createServerData$ } from "solid-start/server";
import { getMessages } from "~/db/getMessages";
import { getServerSession } from "~/auth/auth";

export function routeData({ params }: RouteDataArgs) {
  const messages = createServerData$(
    ([, chatId]) => getMessages(chatId),
    { key: () => ["chatId", params.chatId] });
  const session = createServerData$(async (_, event) => getServerSession(event.request));

  return { messages, session };
}

export default function ChatPage() {
  const params = useParams<{ chatId: string }>();
  const data = useRouteData<typeof routeData>();

  return (
    <>
      <MessageList
        initialMessages={data.messages() ?? []}
        chatId={params.chatId}
        userId={data.session()?.id!}
      />
      <SendMessage chatId={params.chatId} />
    </>
  );
};


