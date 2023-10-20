import { useParams, Title } from "solid-start";
import { Header } from "~/components/Header";
import { ChatList } from "~/components/ChatList";
import { MessageList } from "~/components/MessageList";
import { SendMessage } from "~/components/SendMessage";
import { Show } from "solid-js";

export default function ChatHome() {
  const params = useParams<{ chatId: string }>();

  return (
    <div class="flex flex-col h-screen bg-zinc-200">
      <Header />
      <main class="flex flex-grow mx-auto w-full max-w-screen-xl bg-zinc-200 border-x border-zinc-300">
        <Title>BOBLE Web Chat</Title>
        <ChatList />
        <div class="flex flex-col w-full h-full border-l">
          <Show when={params.chatId} fallback={<WelcomeScreen />}>
            <MessageList />
            <SendMessage />
          </Show>
        </div>
      </main>
    </div>
  );
}

function WelcomeScreen() {
  return (
    <section class="flex-grow px-4 pt-10 text-center bg-zinc-100">
      <p class="mb-4 text-lg font-bold">Open a chat to get started</p>
      <p>You can create a new chat or select an existing one.</p>
    </section>
  );
}
