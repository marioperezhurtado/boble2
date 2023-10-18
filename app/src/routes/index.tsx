import { Header } from "~/components/Header";
import { Title } from "solid-start";
import { MessageList } from "~/components/MessageList";
import { SendMessage } from "~/components/SendMessage";

export default function Home() {
  return (
    <div class="flex flex-col h-screen">
      <Header />
      <main class="flex-1 flex-grow bg-zinc-200">
        <Title>BOBLE Web Chat</Title>
        <div class="mx-auto max-w-screen-md h-full flex flex-col border-x border-zinc-300">
          <MessageList />
          <SendMessage />
        </div>
      </main>
    </div>
  );
}
